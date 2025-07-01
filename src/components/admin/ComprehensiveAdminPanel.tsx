
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Trophy, 
  Calendar, 
  FileText, 
  Settings,
  UserCheck,
  GraduationCap,
  ClipboardList,
  BarChart3,
  Globe,
  Shield,
  Database
} from 'lucide-react';

// Import all management components
import ClubsManagementAdvanced from './ClubsManagementAdvanced';
import CompetitionsManagementAdvanced from './CompetitionsManagementAdvanced';
import PlayersManagementAdvanced from './PlayersManagementAdvanced';
import GamesManagementAdvanced from './GamesManagementAdvanced';
import NewsManagementAdvanced from './NewsManagementAdvanced';
import RefereesManagement from './RefereesManagement';
import CoachesManagement from './CoachesManagement';
import StandingsManagement from './StandingsManagement';
import PlayerStatsManagement from './PlayerStatsManagement';
import NationalTeamManagement from './NationalTeamManagement';
import DocumentsManagement from './DocumentsManagement';
import CalendarManagement from './CalendarManagement';
import TransfersManagement from './TransfersManagement';
import SiteSettingsAdvanced from './SiteSettingsAdvanced';

const ComprehensiveAdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const adminSections = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'clubs', label: 'Clubes', icon: Users },
    { id: 'competitions', label: 'Competições', icon: Trophy },
    { id: 'players', label: 'Jogadores', icon: UserCheck },
    { id: 'games', label: 'Jogos', icon: Calendar },
    { id: 'standings', label: 'Classificações', icon: ClipboardList },
    { id: 'stats', label: 'Estatísticas', icon: BarChart3 },
    { id: 'coaches', label: 'Treinadores', icon: GraduationCap },
    { id: 'referees', label: 'Árbitros', icon: Shield },
    { id: 'nationalteam', label: 'Seleções', icon: Globe },
    { id: 'transfers', label: 'Transferências', icon: Users },
    { id: 'news', label: 'Notícias', icon: FileText },
    { id: 'documents', label: 'Documentos', icon: FileText },
    { id: 'calendar', label: 'Calendário', icon: Calendar },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-cv-blue">
                Painel Administrativo FCBB
              </h1>
              <p className="text-gray-600">
                Sistema completo de gestão de conteúdos
              </p>
            </div>
            <Badge variant="outline" className="text-cv-blue border-cv-blue">
              <Database className="w-4 h-4 mr-1" />
              Sistema Integrado
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 lg:grid-cols-8 gap-1 h-auto p-1 bg-white">
            {adminSections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="flex flex-col items-center gap-1 p-3 text-xs data-[state=active]:bg-cv-blue data-[state=active]:text-white"
              >
                <section.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview">
              <AdminOverview />
            </TabsContent>

            <TabsContent value="clubs">
              <ClubsManagementAdvanced />
            </TabsContent>

            <TabsContent value="competitions">
              <CompetitionsManagementAdvanced />
            </TabsContent>

            <TabsContent value="players">
              <PlayersManagementAdvanced />
            </TabsContent>

            <TabsContent value="games">
              <GamesManagementAdvanced />
            </TabsContent>

            <TabsContent value="standings">
              <StandingsManagement />
            </TabsContent>

            <TabsContent value="stats">
              <PlayerStatsManagement />
            </TabsContent>

            <TabsContent value="coaches">
              <CoachesManagement />
            </TabsContent>

            <TabsContent value="referees">
              <RefereesManagement />
            </TabsContent>

            <TabsContent value="nationalteam">
              <NationalTeamManagement />
            </TabsContent>

            <TabsContent value="transfers">
              <TransfersManagement />
            </TabsContent>

            <TabsContent value="news">
              <NewsManagementAdvanced />
            </TabsContent>

            <TabsContent value="documents">
              <DocumentsManagement />
            </TabsContent>

            <TabsContent value="calendar">
              <CalendarManagement />
            </TabsContent>

            <TabsContent value="settings">
              <SiteSettingsAdvanced />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

// Overview component
const AdminOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="w-4 h-4 text-cv-blue" />
            Clubes Registados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cv-blue">32</div>
          <p className="text-xs text-gray-600">Activos em 9 ilhas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Trophy className="w-4 h-4 text-cv-blue" />
            Competições Ativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cv-blue">8</div>
          <p className="text-xs text-gray-600">Entre regionais e nacionais</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cv-blue" />
            Jogadores Federados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cv-blue">450</div>
          <p className="text-xs text-gray-600">Masculinos e femininos</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cv-blue" />
            Jogos Esta Época
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cv-blue">156</div>
          <p className="text-xs text-gray-600">Realizados e agendados</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveAdminPanel;
