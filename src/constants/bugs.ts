export const PROFILE_PIC_BUG = {
  id: 'profile-pic',
  details: {
    name: 'Unrestricted File Upload ',
    description:
      'The profile picture upload vulnerability allows attackers to upload malicious executable files (e.g., PHP scripts , SVG files), leading to Remote Code Execution (RCE) or Cross-Site Scripting (XSS) or other attacks .',
    originalCode: `public static function uploadUserPhoto($file, $userId)
{
    ..
    ..
    .
    // Can upload .php, .exe, etc. as "profile photo"
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));   // ← attacker-controlled
    $filename = 'user_' . $userId . '_' . time() . '.' . $extension;

    $uploadDir = PUBLIC_PATH . '/' . self::$userUploadDir;
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);   // V1: Insecure permissions
    }

    $uploadPath = $uploadDir . $filename;
    if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
        return ['success' => false, 'filename' => null, 'error' => 'Failed to move uploaded file'];
    }

    return ['success' => true, 'filename' => $filename, 'error' => null];
}`,
    fixedCode: `// Only allow real image MIME types
private static array $allowedMimes = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
];

// Validate uploaded file size
if ($file['size'] > self::$maxUserSize) {
    return self::fail('File too large');
}

// Validate the actual file content (not the filename)
$mime = self::getRealMime($file['tmp_name']);

if (!$mime || !isset(self::$allowedMimes[$mime])) {
    return self::fail('Only JPEG, PNG and WebP images are allowed');
}

// Block dangerous filenames such as shell.php.jpg
if (self::hasDangerousExtension($file['name'])) {
    return self::fail('Invalid filename');
}

// Generate a server-controlled random filename
$filename = self::generateSafeFilename(
    'user_' . $userId,
    self::$allowedMimes[$mime]
);

self::ensureDirectory($uploadDir);

move_uploaded_file($file['tmp_name'], $uploadDir . $filename);`,
  },
};

export const USER_DATA_CORS_BUG = {
  id: 'userdataCors',
  details: {
    name: 'CORS - Cross-Origin Resource Sharing',
    description:
      'The user data component is not using proper CORS headers, potentially allowing cross-origin requests.',
    originalCode: `if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true"); `,
    fixedCode: `$allowedOrigins = [
    'https://bugsy.store',
    'https://www.bugsy.store',
    'https://gp-mobile-ecommerce.vercel.app',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins, true)) {

    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Credentials: true');

    // Prevent cache confusion
    header('Vary: Origin');`,
  },
};

export const PERSONAL_INFO_CSRF_BUG = {
  id: 'personalInfoCsrf',
  details: {
    name: 'CSRF - Cross-Site Request Forgery',
    description:
      'The personal info update form lacks anti-CSRF tokens, allowing attackers to modify data on behalf of the user.',
    originalCode: `//  Attacker-controlled input is accepted blindly from any Origin
$data = $this->getAllInput();

if (empty($data)) {
    return $this->error('No data provided', 400);
}
//No CSRF Tokens

//  Attacker-controlled data is written to the database
$success = $this->userModel->updateProfile($id, $data);`,
    fixedCode: `
// Authentication is performed using a JWT supplied in the Authorization header.
// Browsers do not automatically include Authorization headers in cross-origin
// requests, preventing classical CSRF attacks.
// The authenticated user is obtained from the verified JWT rather than
// from client-controlled parameters or cookies.

$this->requireAuth();

$id = $this->getUserId();`,
  },
};

export const CHANGE_PASSWORD_BUG = {
  id: 'changePasswordBug',
  details: {
    name: 'CSRF - Cross Site Request Forgery ',
    description:
      'The implementation allows changing the password without verifying the old password or including an anti-CSRF token, enabling attackers to reset usage credentials.',
    originalCode: `// AuthController (V1) — /v1/password/reset
public function resetPassword()
{
    $email = $this->getInput('email');
    $userId = $this->getInput('user_id');
    $newPassword = $this->getInput('new_password');
    ...
    // Reset password directly (NO SECURITY CHECKS!)
    // No CSRF token check. No current password check. No ownership/session check.
    $success = $this->userModel->resetPasswordDirect($user['id'], $newPassword);
    ...
}`,
    fixedCode: `// UserModel (V2) — old password required, PDO used automatically
public function changePassword($userId, $oldPassword, $newPassword): bool
{
    $user = $this->find($userId);
    if (!$user) {
        return false;
    }
    if (!$this->verifyPassword($oldPassword, $user['password'])) {
        return false;
    }
    // BaseModel::update() uses PDO automatically
    return $this->update($userId, [
        'password' => $this->hashPassword($newPassword)
    ]);
}`,
  },
};

export const DASHBOARD_BUG = {
  id: 'dashboardBug',
  details: {
    name: 'BAC - Broken Access Control',
    description:
      'The application relies solely on frontend routing to restrict access to the dashboard. Attackers can bypass this by intercepting requests , modifying role to admin , bypass restrictions to admin dashboard',
    originalCode: ` // Access control relies ONLY on Frontend Router
<Route path="/dashboard" element={
    <ProtectedRoute requiredRole="admin">
        <DashboardLayout />
    </ProtectedRoute>
}>
    <Route index element={<Analytics />} />
</Route>

// Broken Access Control: Promo code endpoint Missing role-based authorization validation.
    public function index()
    {
        $promos = $this->promoModel->findAll();
        return $this->json(['promo_codes' => $promos]);
    }
`,
    fixedCode: `// Implement strict server-side authorization to restrict promo code access to administrators only. 

    public function index()
    {
        $this->requireAdmin();

        $promos = $this->promoModel->findAll();

        return $this->json(['promo_codes' => $promos]);
    }

`,
  },
};

export const LOGIN_BUG = {
  id: 'LoginBug',
  details: {
    name: 'SQLI - SQL Injection ',
    description: 'The login form is vulnerable to SQL injection attacks.',
    originalCode: `// UserModel (V1) - email lookup, injectable
public function findByEmail($email)
{
    $sql = "SELECT * FROM {$this->table} WHERE email = '{$email}' LIMIT 1";
    $result = $this->connection->query($sql);
    ...
}

// UserModel (V1) - credential check, injectable 
public function findByCredentials($email, $password)
{
    $sql = "
        SELECT * FROM {$this->table}
        WHERE email = '$email'
        AND password = '" . md5($password) . "'
    ";
    $result = $this->connection->query($sql);
    ...
}`,
    fixedCode: `// UserModel (V2) - parameterized queries, no injection possible
public function findByEmail($email): ?array
{
    $stmt = $this->connection->prepare(
        "SELECT * FROM {$this->table} WHERE email = :email LIMIT 1"
    );
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(\\PDO::FETCH_ASSOC);
    return $user ?: null;
}

// UserModel (V2) - credential check, password verified in PHP
public function findByCredentials($email, $password): ?array
{
    $user = $this->findByEmail($email);
    if (!$user) {
        return null;
    }
    if (!$this->verifyPassword($password, $user['password'])) {
        return null;
    }
    return $user;
}`,
  },
};

export const USER_ENUMERATION_BUG = {
  id: 'userEnumeration',
  details: {
    name: 'User Enumeration via Distinct Login Error Messages',
    description:
      "The application reveals whether a user exists in the system by returning distinct error messages ('Invalid email' vs 'Invalid credentials') during login, allowing attackers to harvest valid email addresses.",
    originalCode: `// AuthController (V1)
$existingUser = $this->userModel->findByEmail($email);
if (!$existingUser) {
    return $this->error('Invalid email', 401);   // ← confirms email does NOT exist
}


$user = $this->userModel->findByCredentials($email, $password);
if (!$user) {
    return $this->error('Invalid credentials', 401);   // ← different message when password is wrong
}`,
    fixedCode: `// AuthController (V2) - single generic error, no separate existence check
$user = $this->userModel->findByCredentials($email, $password);

if (!$user) {
    // Same generic message whether email doesn't exist OR password is wrong
    $this->error('Invalid credentials', 401);
    return;
}`,
  },
};

export const WEB_CACHE_DECEPTION_BUG = {
  id: 'webCacheDeception',
  details: {
    name: 'Web Cache Deception',
    description:
      'Web Cache Deception occurs when an attacker tricks a caching proxy into caching sensitive, user-specific data (e.g., API responses) by appending a fake static file extension (e.g., .css, .js) to the API endpoint URL.',
    originalCode: `// Application URL Normalization
// Router normalizes fake static extensions
$this->Url = preg_replace('/\\.(css|js|jpg|jpeg|png|gif)$/i', '', $this->Url);

// Cache Configuration
// Treats requests ending with static extensions as cacheable
if (preg_match('/\\.(css|js|jpg|jpeg|png|gif)$/i', $requestUri)) {
    header_remove('Cache-Control');
    header_remove('Pragma');
    header_remove('Expires');

    header('Cache-Control: public, max-age=600');
}`,
    fixedCode: `// 1. Reject Fake Static Extensions for API Routes
if (preg_match('/^\\/api\\/.*\\.(css|js|jpg|jpeg|png|gif)$/i', $_SERVER['REQUEST_URI'])) {
    http_response_code(404);
    exit;
}

// 2. Disable Caching for Authenticated API Responses
header('Cache-Control: private, no-store, no-cache, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

/* 3. In addition, the web server should disable shared caching for authenticated API endpoints (e.g., /api/*) so that every request reaches the authentication middleware before a response is generated. */`,
  },
};

export const IDOR_BUG = {
  id: 'idorBug',
  details: {
    name: 'IDOR - Insecure Direct Object Reference',
    description:
      'Insecure Direct Object Reference (IDOR) occurs when an application provides direct access to objects based on user-supplied input without verifying if the user has authorization to access those objects.',
    originalCode: ` // GET /api/v1/user/{id}
public function show($id)
{
    // Require authentication
    $this->requireAuth();

    // Validate ID
    if (!$id || !is_numeric($id)) {
        return $this->error('Invalid user ID', 400);
    }

    // Vulnerable: No ownership validation
    $user = $this->userModel->getProfile($id);

    if (!$user) {
        return $this->error('User not found', 404);
    }

    return $this->json([
        'user' => $user
    ]);
}`,
    fixedCode: `public function show(int $id): void
{
    $this->requireAuth();

    if (!$id || !is_numeric($id)) {
        $this->error('Invalid user ID', 400);
        return;
    }

    // Enforce object ownership
    $this->checkOwnership($id, 'You cannot view this profile');

    $user = $this->userModel->getProfile($id);

    if (!$user) {
        $this->error('User not found', 404);
        return;
    }

    if ($user['profile_photo']) {
        $user['profile_photo_url'] = ImageUpload::getUserPhotoUrl($user['profile_photo']);
    } else {
        $user['profile_photo_url'] = null;
    }

    $this->json(['user' => $user]);
}`,
  },
};

export const WEAK_PASSWORD_HASH_BUG = {
  id: 'weakPasswordHash',
  details: {
    name: 'Weak Password Hashing Algorithm (MD5)',
    description:
      'Using MD5 for password hashing is insecure because it is computationally fast, allowing attackers to perform offline brute-force and dictionary attacks quickly. MD5 is also vulnerable to collision attacks.',
    originalCode: `// UserModel (V1) — weak, unsalted MD5 hashing
public function verifyPassword($plainPassword, $hashedPassword)
{
    return md5($plainPassword) === $hashedPassword;
}

public function hashPassword($password)
{
    return md5($password);
}`,
    fixedCode: `// UserModel (V2) — bcrypt with configurable cost, automatic per-hash salting
public function hashPassword($password): string
{
    return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
}

public function verifyPassword($plainPassword, $hashedPassword): bool
{
    return password_verify($plainPassword, $hashedPassword);
}`,
  },
};
