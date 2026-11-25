import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, fetchUser, createUser, updateUser } from '../api/users.js';

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

export const useUser = (id) =>
  useQuery({
    queryKey: ['users', String(id)],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: (created) => {
      // JSONPlaceholder doesn't persist, so patch the cache; with a real API use invalidateQueries.
      qc.setQueryData(['users'], (old = []) => [...old, created]);
      // qc.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

/**
 * ⭐ Bonus (+2 Marks): Optimistic update (onMutate / onError rollback) for "favorite user" toggle
 */
export function useToggleFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isFavorite }) => updateUser(id, { isFavorite }),
    onMutate: async ({ id, isFavorite }) => {
      // Cancel outgoing refetches
      await qc.cancelQueries({ queryKey: ['users'] });
      await qc.cancelQueries({ queryKey: ['users', String(id)] });

      // Snapshot previous values
      const previousUsers = qc.getQueryData(['users']);
      const previousUser = qc.getQueryData(['users', String(id)]);

      // Optimistically update 'users' cache
      qc.setQueryData(['users'], (old = []) =>
        old.map((u) => (u.id === Number(id) ? { ...u, isFavorite } : u))
      );

      // Optimistically update single 'user' cache if present
      if (previousUser) {
        qc.setQueryData(['users', String(id)], (old) => ({
          ...old,
          isFavorite,
        }));
      }

      return { previousUsers, previousUser };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousUsers) {
        qc.setQueryData(['users'], context.previousUsers);
      }
      if (context?.previousUser) {
        qc.setQueryData(['users', String(variables.id)], context.previousUser);
      }
    },
    onSettled: (data, error, variables) => {
      // Sync cache
      qc.invalidateQueries({ queryKey: ['users'] });
      qc.invalidateQueries({ queryKey: ['users', String(variables.id)] });
    },
  });
}
