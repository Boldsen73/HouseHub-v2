
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { 
  BarChart3, 
  Home, 
  Users, 
  FileText, 
  TrendingUp, 
  Settings,
  Building2,
  UserCog
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, onTabChange }) => {
  const dashboardItems = [
    {
      title: "Overblik",
      value: "overview",
      icon: BarChart3,
    }
  ];

  const caseItems = [
    {
      title: "Sager",
      value: "cases",
      icon: Home,
    },
    {
      title: "Tilbud",
      value: "offers",
      icon: FileText,
    }
  ];

  const userItems = [
    {
      title: "Mæglere",
      value: "agents",
      icon: Building2,
    },
    {
      title: "Sælgere",
      value: "sellers",
      icon: Users,
    }
  ];

  const analyticsItems = [
    {
      title: "Statistik",
      value: "statistics",
      icon: TrendingUp,
    }
  ];

  const settingsItems = [
    {
      title: "Indstillinger",
      value: "settings",
      icon: Settings,
    }
  ];

  const renderMenuGroup = (items: any[], groupLabel: string) => (
    <SidebarGroup>
      <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.value}>
              <SidebarMenuButton 
                asChild 
                isActive={activeTab === item.value}
                onClick={() => onTabChange(item.value)}
              >
                <button className="flex items-center gap-2 w-full">
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <UserCog className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold">HouseHub Admin</h2>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 mt-2">
          Administrator Panel
        </Badge>
      </SidebarHeader>
      
      <SidebarContent>
        {renderMenuGroup(dashboardItems, "Dashboard")}
        {renderMenuGroup(caseItems, "Sager")}
        {renderMenuGroup(userItems, "Brugere")}
        {renderMenuGroup(analyticsItems, "Analyse")}
        {renderMenuGroup(settingsItems, "System")}
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-gray-500">
          HouseHub Admin v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
