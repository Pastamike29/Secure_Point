
import { Javascript } from "@mui/icons-material";
import { CodeSnippets } from "../CodeSnippets";

export const getPrivilegeEscalationCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `// ตัวอย่างการควบคุมสิทธิ์การเข้าถึงข้อมูล
const userRole = 'user';  // สมมติว่าผู้ใช้มีสิทธิ์เป็น 'user'

function accessSettings() {
  // ตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึงการตั้งค่าหรือไม่
  if (userRole !== 'admin') {
    console.log('You do not have permission to access settings.');
    return;
  }

  // ดำเนินการที่ต้องการสิทธิ์ admin
  console.log('Accessing settings...');
}

accessSettings();  // Output: You do not have permission to access settings.
`,
           python: `user_role = 'user'  # สมมติว่าผู้ใช้มีสิทธิ์เป็น 'user'

def access_settings():
    # ตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึงการตั้งค่าหรือไม่
    if user_role != 'admin':
        print('You do not have permission to access settings.')
        return

    # ดำเนินการที่ต้องการสิทธิ์ admin
    print('Accessing settings...')

access_settings()  # Output: You do not have permission to access settings.
`,
           java: `public class Main {
    public static void main(String[] args) {
        String userRole = "user";  // สมมติว่าผู้ใช้มีสิทธิ์เป็น 'user'

        accessSettings(userRole);
    }

    public static void accessSettings(String userRole) {
        // ตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึงการตั้งค่าหรือไม่
        if (!userRole.equals("admin")) {
            System.out.println("You do not have permission to access settings.");
            return;
        }

        // ดำเนินการที่ต้องการสิทธิ์ admin
        System.out.println("Accessing settings...");
    }
}
`,
         };
       case 'Lesson2':
         return {
           javascript: `// ฟังก์ชันบันทึกกิจกรรมการเข้าถึง
function logActivity(username, action) {
  const timestamp = new Date().toISOString();
  console.log('['$'{timestamp}] User: '$'{username} performed action: '$'{action}');
}

logActivity('user1', 'Attempted to access admin settings');
// Output: [2024-11-07T12:34:56.789Z] User: user1 performed action: Attempted to access admin settings
`,
           python: `from datetime import datetime

def log_activity(username, action):
    timestamp = datetime.now().isoformat()
    print(f'[{timestamp}] User: {username} performed action: {action}')

log_activity('user1', 'Attempted to access admin settings')
# Output: [2024-11-07T12:34:56.789123] User: user1 performed action: Attempted to access admin settings
`,
           java: `import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ActivityLogger {
    public static void logActivity(String username, String action) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        String timestamp = LocalDateTime.now().format(formatter);
        System.out.println("[" + timestamp + "] User: " + username + " performed action: " + action);
    }

    public static void main(String[] args) {
        logActivity("user1", "Attempted to access admin settings");
        // Output: [2024-11-07T12:34:56] User: user1 performed action: Attempted to access admin settings
    }
}
`,
         };
   
      case 'Lesson3':
        return{
          javascript:`// ตัวอย่างการใช้งาน OTP (One-Time Password)
const users = {
  user1: { password: 'password123', otp: null }
};

function generateOTP(user) {
  const otp = Math.floor(100000 + Math.random() * 900000);  // สุ่ม OTP 6 หลัก
  users[user].otp = otp;
  console.log('Generated OTP for '$'{user}: '$'{otp}');
  return otp;
}

function verifyOTP(user, inputOTP) {
  if (users[user].otp === parseInt(inputOTP)) {
    console.log('OTP verified successfully!');
  } else {
    console.log('Invalid OTP.');
  }
}

generateOTP('user1');  // สุ่ม OTP
verifyOTP('user1', '123456');  // ตัวอย่างการยืนยัน OTP
`,
python:`import random

# ตัวอย่างข้อมูลผู้ใช้
users = {
    'user1': {'password': 'password123', 'otp': None}
}

# ฟังก์ชันในการสร้าง OTP
def generate_otp(user):
    otp = random.randint(100000, 999999)  # สุ่ม OTP 6 หลัก
    users[user]['otp'] = otp
    print(f'Generated OTP for {user}: {otp}')
    return otp

# ฟังก์ชันในการยืนยัน OTP
def verify_otp(user, input_otp):
    if users[user]['otp'] == int(input_otp):
        print('OTP verified successfully!')
    else:
        print('Invalid OTP.')

# ทดสอบการสร้าง OTP และยืนยัน OTP
generate_otp('user1')  # สุ่ม OTP
verify_otp('user1', '123456')  # ตัวอย่างการยืนยัน OTP
`,
java:`import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class OTPExample {
    // ตัวอย่างข้อมูลผู้ใช้
    private static Map<String, Map<String, Object>> users = new HashMap<>();
    
    static {
        Map<String, Object> user1 = new HashMap<>();
        user1.put("password", "password123");
        user1.put("otp", null);
        users.put("user1", user1);
    }

    // ฟังก์ชันในการสร้าง OTP
    public static int generateOTP(String user) {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);  // สุ่ม OTP 6 หลัก
        users.get(user).put("otp", otp);
        System.out.println("Generated OTP for " + user + ": " + otp);
        return otp;
    }

    // ฟังก์ชันในการยืนยัน OTP
    public static void verifyOTP(String user, String inputOTP) {
        int otp = (int) users.get(user).get("otp");
        if (otp == Integer.parseInt(inputOTP)) {
            System.out.println("OTP verified successfully!");
        } else {
            System.out.println("Invalid OTP.");
        }
    }

    public static void main(String[] args) {
        generateOTP("user1");  // สุ่ม OTP
        verifyOTP("user1", "123456");  // ตัวอย่างการยืนยัน OTP
    }
}
`
        }
   
       default:
         return {
           javascript: `console.log('Directory Traversal default code');`,
         };
     }
   };