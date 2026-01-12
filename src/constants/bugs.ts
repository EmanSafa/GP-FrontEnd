export const PROFILE_PIC_BUG = {
  id: "profile-pic",
  details: {
    name: "Unrestricted File Upload Vulnerable Code",
    description:
      "The profile picture upload vulnerability allows attackers to upload malicious executable files (e.g., PHP scripts), leading to Remote Code Execution (RCE).",
    originalCode: `
$extension = pathinfo($file['name'], PATHINFO_EXTENSION); // attacker-controlled
$filename = uniqid() . '.' . $extension;

$destination = PUBLIC_PATH . '/uploads/' . $filename;
move_uploaded_file($file['tmp_name'], $destination); // executable webroot`,
    fixedCode: ``,
  },
};

export const USER_DATA_CORS_BUG = {
  id: "userdataCors",
  details: {
    name: "CORS - Cross-Origin Resource Sharing",
    description:
      "The user data component is not using proper CORS headers, potentially allowing cross-origin requests.",
    originalCode: `if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true"); `,
    fixedCode: ``,
  },
};

export const PERSONAL_INFO_CSRF_BUG = {
  id: "personalInfoCsrf",
  details: {
    name: "CSRF - Cross-Site Request Forgery",
    description:
      "The personal info update form lacks anti-CSRF tokens, allowing attackers to modify data on behalf of the user.",
    originalCode: `//  Attacker-controlled input is accepted blindly from any Origin
$data = $this->getAllInput();

if (empty($data)) {
    return $this->error('No data provided', 400);
}
//No CSRF Tokens

//  Attacker-controlled data is written to the database
$success = $this->userModel->updateProfile($id, $data);`,
    fixedCode: ``,
  },
};

export const CHANGE_PASSWORD_BUG = {
  id: "changePasswordBug",
  details: {
    name: "CSRF - Cross Site Request Forgery - Password Change",
    description:
      "The implementation allows changing the password without verifying the old password or including an anti-CSRF token, enabling attackers to reset usage credentials.",
    originalCode: `
public function resetPasswordDirect($userId, $newPassword)
    {
        // Hash new password
        $hashedPassword = $this->hashPassword($newPassword);
        
        // Update password
        $success = $this->update($userId, ['password' => $hashedPassword]);
        
        if ($success) {
            if (APP_ENV === 'development') {
                error_log("Password reset for user ID: {$userId}");
            }
        }
        
        return $success;
    }`,
    fixedCode: ``,
  },
};

export const DASHBOARD_BUG = {
  id: "dashboardBug",
  details: {
    name: "BAC - Broken Access Control",
    description:
      "The application relies solely on frontend routing to restrict access to the dashboard. Attackers can bypass this by modifying client-side code or sending direct API requests.",
    originalCode: `// Vulnerable: Access control relies ONLY on Frontend Router
<Route path="/dashboard" element={
    <ProtectedRoute requiredRole="admin">
        <DashboardLayout />
    </ProtectedRoute>
}>
    <Route index element={<Analytics />} />
</Route>`,
    fixedCode: `// Secure: Backend enforces Role-Based Access Control (RBAC)
`,
  },
};

export const LOGIN_BUG = {
  id: "LoginBug",
  details: {
    name: "SQLI - Vulnerable Code ",
    description: "The login form is vulnerable to SQL injection attacks.",
    originalCode: `public function findByCredentials($email, $password)
    {
        $sql = "
            SELECT * FROM {$this->table}
            WHERE email = '$email'
            AND password = '" . md5($password) . "'
        ";

        $result = $this->connection->query($sql);`,
    fixedCode: ``,
  },
};
