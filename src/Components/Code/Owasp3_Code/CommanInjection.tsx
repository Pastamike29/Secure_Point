
import { Javascript } from "@mui/icons-material";
import { CodeSnippets } from "../../../Components/Code/CodeSnippets";

export const getCommandInjectionCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `const { execFile } = require('child_process');

const filename = 'report.txt'; // ชื่อไฟล์ที่ต้องการอ่านจากผู้ใช้

// ใช้ execFile เพื่อป้องกัน command injection
execFile('cat', [filename], (error, stdout, stderr) => {
  if (error) {
    console.error('Error executing command:', error);
    return;
  }
  console.log('File contents:', stdout);
});
`,
           python: `import subprocess

# ชื่อไฟล์ที่ต้องการอ่านจากผู้ใช้
filename = 'report.txt'

# ใช้ subprocess.run เพื่อป้องกัน command injection
try:
    # Run the 'cat' command with the filename as an argument
    result = subprocess.run(['cat', filename], capture_output=True, text=True, check=True)
    
    # Print the contents of the file
    print('File contents:', result.stdout)
except subprocess.CalledProcessError as e:
    print('Error executing command:', e)
`,
           java: `import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class FileReader {
    public static void main(String[] args) {
        String filename = "report.txt"; // ชื่อไฟล์ที่ต้องการอ่านจากผู้ใช้

        // ใช้ ProcessBuilder เพื่อป้องกัน command injection
        ProcessBuilder processBuilder = new ProcessBuilder("cat", filename);

        try {
            // Start the process
            Process process = processBuilder.start();

            // Read the output of the process
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            System.out.println("File contents:");
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            // Wait for the process to finish and check the exit value
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                System.out.println("Error executing command. Exit code: " + exitCode);
            }

        } catch (IOException | InterruptedException e) {
            System.err.println("Error executing command: " + e.getMessage());
        }
    }
}
`,
         };
       case 'Lesson2':
         return {
           javascript: `const { exec } = require('child_process');

// ตัวอย่างการกรองข้อมูลให้มีเพียงตัวอักษร, ตัวเลข และ underscore
function sanitizeInput(input) {
  return input.replace(/[^a-zA-Z0-9_]/g, '');
}

const filename = sanitizeInput('report.txt; rm -rf /'); // Input จากผู้ใช้
const command = 'cat '$'{your_filename}';

// รันคำสั่งด้วยข้อมูลที่ผ่านการกรองแล้ว
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('Error executing command:', error);
    return;
  }
  console.log('File contents:', stdout);
});
`,
           python: `import subprocess

# Function to sanitize input, removing non-alphanumeric characters and underscores
def sanitize_input(input_str):
    return ''.join(e for e in input_str if e.isalnum() or e == '_')

# Input from user
filename = sanitize_input('report.txt; rm -rf /')

# Prepare the command with the sanitized filename
command = f'cat {filename}'

try:
    # Run the command
    result = subprocess.run(command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print('File contents:', result.stdout.decode())
except subprocess.CalledProcessError as error:
    print(f'Error executing command: {error}')
`,
           java: `import java.io.*;

public class CommandExecutor {

    // Function to sanitize input, allowing only alphanumeric characters and underscores
    public static String sanitizeInput(String input) {
        return input.replaceAll("[^a-zA-Z0-9_]", "");
    }

    public static void main(String[] args) {
        // Input from user
        String filename = sanitizeInput("report.txt; rm -rf /");

        // Prepare the command
        String command = "cat " + filename;

        try {
            // Execute the command
            Process process = Runtime.getRuntime().exec(command);

            // Get the output from the process
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder output = new StringBuilder();

            // Read the output line by line
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            // Print the output
            System.out.println("File contents:\n" + output.toString());

            // Wait for the command to complete
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            System.err.println("Error executing command: " + e.getMessage());
        }
    }
}
`,
         };
   
     case 'Lesson3':
     return{
      javascript:`const { spawn } = require('child_process');

// จำกัดการเข้าถึงโดยไม่ใช้ root user และจำกัด directory ที่เข้าถึงได้
const restrictedSpawn = (command, args) => {
  const child = spawn(command, args, {
    uid: 1001,  // กำหนดให้ใช้ UID ที่ไม่มีสิทธิ root
    cwd: '/var/www/app',  // จำกัด directory ที่สามารถเข้าถึงได้
    env: {
      PATH: '/usr/bin',  // จำกัด PATH เฉพาะ directory ที่ต้องการ
    },
  });

  child.stdout.on('data', (data) => {
    console.log('Output: '$'{data}');
  });

  child.stderr.on('data', (data) => {
    console.error('Error: '$'{data}');
  });
};

const filename = 'report.txt';
restrictedSpawn('cat', [filename]);
`,
python:`import subprocess
import os

# จำกัดการเข้าถึงโดยไม่ใช้ root user และจำกัด directory ที่เข้าถึงได้
def restricted_spawn(command, args):
    # สร้าง child process โดยกำหนด user และ environment
    try:
        process = subprocess.Popen(
            [command] + args,  # กำหนดคำสั่งและอาร์กิวเมนต์
            stdout=subprocess.PIPE,  # เก็บ output ของโปรเซส
            stderr=subprocess.PIPE,  # เก็บ error ของโปรเซส
            cwd='/var/www/app',  # จำกัด directory ที่สามารถเข้าถึงได้
            env={'PATH': '/usr/bin'},  # กำหนด PATH ที่สามารถเข้าถึงได้
            preexec_fn=lambda: os.setuid(1001)  # กำหนด UID ให้เป็น 1001 (ไม่ใช่ root)
        )

        # รับข้อมูลจาก stdout
        stdout, stderr = process.communicate()
        
        if stdout:
            print('Output:', stdout.decode())
        
        if stderr:
            print('Error:', stderr.decode())
    
    except Exception as e:
        print(f"Error occurred: {e}")

# ตัวอย่างการใช้งาน
filename = 'report.txt'
restricted_spawn('cat', [filename])
`,
java:`import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class RestrictedSpawn {

    public static void restrictedSpawn(String command, String[] args) {
        try {
            // สร้าง ProcessBuilder เพื่อรันคำสั่ง
            ProcessBuilder processBuilder = new ProcessBuilder();
            
            // กำหนดคำสั่งและอาร์กิวเมนต์
            processBuilder.command(command, args);
            
            // กำหนด directory ที่จะทำงานในนั้น
            processBuilder.directory(new java.io.File("/var/www/app"));
            
            // กำหนด environment variables (จำกัดเฉพาะ PATH)
            processBuilder.environment().put("PATH", "/usr/bin");

            // กำหนด user ที่จะรันคำสั่ง (ไม่ได้ใช้ root user)
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();

            // อ่าน output ของคำสั่ง
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Output: " + line);
            }

            // รอให้โปรเซสทำงานเสร็จ
            int exitCode = process.waitFor();
            System.out.println("Process finished with exit code: " + exitCode);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        String filename = "report.txt";
        restrictedSpawn("cat", new String[]{filename});
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