
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Edit, 
  Trash2, 
  Key,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const UserManagement = () => {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  const mockUsers = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@fcbb.cv',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-06-30 14:30',
      created: '2024-01-15'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@fcbb.cv',
      role: 'editor',
      status: 'active',
      lastLogin: '2024-06-30 12:15',
      created: '2024-02-20'
    },
    {
      id: 3,
      name: 'Pedro Mendes',
      email: 'pedro@fcbb.cv',
      role: 'gestor',
      status: 'inactive',
      lastLogin: '2024-06-25 09:45',
      created: '2024-03-10'
    }
  ];

  const roleColors = {
    admin: 'bg-red-100 text-red-800',
    editor: 'bg-blue-100 text-blue-800',
    gestor: 'bg-green-100 text-green-800',
    user: 'bg-gray-100 text-gray-800'
  };

  const rolePermissions = {
    admin: [
      'Gestão completa do sistema',
      'Gestão de utilizadores',
      'Configurações avançadas',
      'Relatórios e analytics',
      'Integração FIBA'
    ],
    editor: [
      'Gestão de conteúdos',
      'Publicação de notícias',
      'Gestão de multimédia',
      'Moderação de comentários'
    ],
    gestor: [
      'Gestão de competições',
      'Gestão de equipas',
      'Gestão de jogadores',
      'Resultados e estatísticas'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Gestão de Utilizadores</h3>
          <p className="text-sm text-gray-600">Gerir utilizadores e permissões do sistema</p>
        </div>
        <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cv-blue hover:bg-cv-blue/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Utilizador
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Criar Novo Utilizador</DialogTitle>
              <DialogDescription>
                Adicionar novo utilizador ao sistema
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input id="fullName" placeholder="Nome completo" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@fcbb.cv" />
              </div>
              <div>
                <Label htmlFor="role">Perfil de Acesso</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="gestor">Gestor</SelectItem>
                    <SelectItem value="user">Utilizador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="password">Palavra-passe Temporária</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sendEmail" />
                <Label htmlFor="sendEmail">Enviar email de boas-vindas</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-cv-blue hover:bg-cv-blue/90">
                  Criar Utilizador
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Utilizadores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">23</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Administradores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Editores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Gestores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Utilizadores</CardTitle>
          <CardDescription>Gerir contas de utilizador e permissões</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.role as keyof typeof roleColors]}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(rolePermissions).map(([role, permissions]) => (
          <Card key={role}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
              </CardTitle>
              <CardDescription>Permissões do perfil {role}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {permissions.map((permission, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cv-blue rounded-full"></div>
                    <span className="text-sm">{permission}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Segurança</CardTitle>
          <CardDescription>Definições globais de segurança</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Autenticação de Dois Fatores</Label>
              <p className="text-sm text-gray-600">Obrigar 2FA para administradores</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Expiração de Sessão</Label>
              <p className="text-sm text-gray-600">Sessões expiram em 24 horas</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Bloqueio por Tentativas</Label>
              <p className="text-sm text-gray-600">Bloquear após 5 tentativas falhadas</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
