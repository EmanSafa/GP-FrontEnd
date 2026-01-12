export const PROFILE_PIC_BUG = {
  id: "profile-pic",
  details: {
    name: "RCE - Remote code execution",
    description:
      "The profile picture component lacks proper image optimization and fallback handling, potentially causing layout shifts.",
    originalCode: `<img src={user.image} alt="Profile" />`,
    fixedCode: ``,
  },
};

export const USER_DATA_CORS_BUG = {
  id: "userdataCors",
  details: {
    name: "CORS - Cross-Origin Resource Sharing",
    description:
      "The user data component is not using proper CORS headers, potentially allowing cross-origin requests.",
    originalCode: `<UserDropDown > <UserDropDown> `,
    fixedCode: ``,
  },
};

export const PERSONAL_INFO_CSRF_BUG = {
  id: "personalInfoCsrf",
  details: {
    name: "CSRF - Cross-Site Request Forgery",
    description:
      "The personal info update form lacks anti-CSRF tokens, allowing attackers to modify data on behalf of the user.",
    originalCode: `<form method="POST" action="/update-info">`,
    fixedCode: ``,
  },
};

export const CHANGE_PASSWORD_BUG = {
  id: "changePasswordBug",
  details: {
    name: "CSRF => Cross site request forgery",
    description:
      "The change password component is not using proper CORS headers, potentially allowing cross-origin requests.",
    originalCode: `<form onSubmit={handleSubmit} className="space-y-4">`,
    fixedCode: ``,
  },
};

export const DASHBOARD_BUG = {
  id: "dashboardBug",
  details: {
    name: "BAC - Broken Access control ",
    description: "The dashboard layout is vulnerable to SQL injection attacks.",
    originalCode: `<SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="mt-10">
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.url}>
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <main className="w-full">
                <SidebarTrigger />
                <div className="p-4">
                    {children}
                </div>
            </main>
        </SidebarProvider>`,
    fixedCode: ``,
  },
};

export const LOGIN_BUG = {
  id: "LoginBug",
  details: {
    name: "(SQLi) - SQL Injection ",
    description: "The login form is vulnerable to SQL injection attacks.",
    originalCode: `<form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >`,
    fixedCode: ``,
  },
};
