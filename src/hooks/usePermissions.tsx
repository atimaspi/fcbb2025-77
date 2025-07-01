
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DetailedRole } from '@/components/auth/RoleSelector';

export type UserRole = 'admin' | 'user' | 'moderator' | 'editor';

export interface Permission {
  resource: string;
  action: string;
}

const DETAILED_ROLE_PERMISSIONS: Record<DetailedRole, Permission[]> = {
  admin: [
    { resource: 'news', action: 'create' },
    { resource: 'news', action: 'edit' },
    { resource: 'news', action: 'delete' },
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'create' },
    { resource: 'events', action: 'edit' },
    { resource: 'events', action: 'delete' },
    { resource: 'events', action: 'view' },
    { resource: 'users', action: 'create' },
    { resource: 'users', action: 'edit' },
    { resource: 'users', action: 'delete' },
    { resource: 'users', action: 'view' },
    { resource: 'dashboard', action: 'view' },
    { resource: 'settings', action: 'edit' },
  ],
  editor: [
    { resource: 'news', action: 'create' },
    { resource: 'news', action: 'edit' },
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'create' },
    { resource: 'events', action: 'edit' },
    { resource: 'events', action: 'view' },
    { resource: 'dashboard', action: 'view' },
  ],
  moderator: [
    { resource: 'news', action: 'edit' },
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'edit' },
    { resource: 'events', action: 'view' },
    { resource: 'dashboard', action: 'view' },
  ],
  treinador: [
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'view' },
    { resource: 'dashboard', action: 'view' },
    { resource: 'teams', action: 'edit' },
    { resource: 'players', action: 'edit' },
  ],
  arbitro: [
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'view' },
    { resource: 'dashboard', action: 'view' },
    { resource: 'games', action: 'edit' },
    { resource: 'referees', action: 'view' },
  ],
  dirigente: [
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'view' },
    { resource: 'dashboard', action: 'view' },
    { resource: 'clubs', action: 'edit' },
    { resource: 'teams', action: 'view' },
  ],
  jornalista: [
    { resource: 'news', action: 'create' },
    { resource: 'news', action: 'edit' },
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'view' },
    { resource: 'dashboard', action: 'view' },
  ],
  user: [
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'view' },
  ],
};

export const usePermissions = () => {
  const { user, isAdmin } = useAuth();
  const [userRole, setUserRole] = useState<DetailedRole>('user');
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserRole = useCallback(async () => {
    if (!user || isLoading) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Quick check by email first
      if (user.email === 'admin@fcbb.cv') {
        console.log('Admin role detected by email');
        setUserRole('admin');
        return;
      }

      // Try to fetch from database with error handling
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!error && data && data.role) {
        console.log('Role from database:', data.role);
        setUserRole(data.role as DetailedRole);
      } else {
        console.log('Using fallback role determination');
        // Fallback logic
        if (user.email === 'admin@fcbb.cv' || isAdmin) {
          setUserRole('admin');
        } else {
          setUserRole('user');
        }
      }
    } catch (error: any) {
      console.error('Error fetching user role:', error);
      // Fallback logic
      if (user.email === 'admin@fcbb.cv' || isAdmin) {
        setUserRole('admin');
      } else {
        setUserRole('user');
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, isAdmin, isLoading]);

  useEffect(() => {
    if (user) {
      fetchUserRole();
    } else {
      setUserRole('user');
    }
  }, [user, fetchUserRole]);

  const getUserRole = (): DetailedRole => {
    // Use multiple fallback strategies
    if (user?.email === 'admin@fcbb.cv' || isAdmin) {
      return 'admin';
    }
    return userRole;
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false;
    
    const currentRole = getUserRole();
    console.log('Checking permission:', { resource, action, currentRole, userEmail: user.email });
    
    const permissions = DETAILED_ROLE_PERMISSIONS[currentRole] || [];
    
    const hasAccess = permissions.some(
      permission => permission.resource === resource && permission.action === action
    );
    
    console.log('Permission granted:', hasAccess);
    return hasAccess;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => 
      hasPermission(permission.resource, permission.action)
    );
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => 
      hasPermission(permission.resource, permission.action)
    );
  };

  const canAccessAdminArea = (): boolean => {
    const canAccess = hasPermission('dashboard', 'view');
    console.log('Can access admin area:', canAccess);
    return canAccess;
  };

  const canManageUsers = (): boolean => {
    return hasPermission('users', 'create');
  };

  const canManageNews = (): boolean => {
    return hasPermission('news', 'create');
  };

  const canManageEvents = (): boolean => {
    return hasPermission('events', 'create');
  };

  return {
    user,
    userRole: getUserRole(),
    isLoading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessAdminArea,
    canManageUsers,
    canManageNews,
    canManageEvents,
  };
};
