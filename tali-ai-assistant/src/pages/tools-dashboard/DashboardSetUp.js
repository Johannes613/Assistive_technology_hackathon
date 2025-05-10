import * as React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useDemoRouter } from "@toolpad/core/internal";
import "./Dashboard.css";
import { sideNav } from "./SideNavList";
import { customTheme } from "./DashboardTheme";
import ComponentContainer from "./ComponentContainer";

function DashboardSetUp() {
  const router = useDemoRouter("/dashboard");

  return (
    <AppProvider navigation={sideNav} router={router} theme={customTheme}>
      <DashboardLayout
        title="Tali"
        sx={{
          '& .MuiDrawer-paper': {
            width: 290, // Mini sidebar width
            overflowX: 'hidden',
            transition: 'width 0.3s ease',
          },
        }}
      >
        <ComponentContainer pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardSetUp;
