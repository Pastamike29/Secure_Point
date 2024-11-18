
import { Javascript } from "@mui/icons-material";
import { CodeSnippets } from "../CodeSnippets";

export const getServerSideRequestForgeryCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `const axios = require('axios');

// กำหนด Allowlist ของโดเมนที่อนุญาต
const allowedDomains = ['https://example.com', 'https://api.example.com'];

async function fetchData(url) {
    // ตรวจสอบว่า URL อยู่ใน Allowlist
    if (!allowedDomains.some(domain => url.startsWith(domain))) {
        throw new Error('URL นี้ไม่ได้รับอนุญาต');
    }

    // หาก URL ได้รับอนุญาต ให้ส่งคำขอ
    const response = await axios.get(url);
    return response.data;
}

// ตัวอย่างการเรียกใช้ฟังก์ชัน
fetchData('https://example.com/resource')
    .then(data => console.log(data))
    .catch(err => console.error(err));
`,
           python: `import requests

# กำหนด Allowlist ของโดเมนที่อนุญาต
allowed_domains = ['https://example.com', 'https://api.example.com']

def fetch_data(url):
    # ตรวจสอบว่า URL อยู่ใน Allowlist
    if not any(url.startswith(domain) for domain in allowed_domains):
        raise ValueError("URL นี้ไม่ได้รับอนุญาต")
    
    # หาก URL ได้รับอนุญาต ให้ส่งคำขอ
    response = requests.get(url)
    return response.json()

# ตัวอย่างการเรียกใช้ฟังก์ชัน
try:
    data = fetch_data('https://example.com/resource')
    print(data)
except Exception as e:
    print(e)
`,
           java: `import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

public class Main {
    // กำหนด Allowlist ของโดเมนที่อนุญาต
    private static List<String> allowedDomains = Arrays.asList("https://example.com", "https://api.example.com");

    public static String fetchData(String urlString) throws Exception {
        // ตรวจสอบว่า URL อยู่ใน Allowlist
        boolean allowed = allowedDomains.stream().anyMatch(urlString::startsWith);
        if (!allowed) {
            throw new Exception("URL นี้ไม่ได้รับอนุญาต");
        }

        // หาก URL ได้รับอนุญาต ให้ส่งคำขอ
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        return response.toString();
    }

    public static void main(String[] args) {
        try {
            String data = fetchData("https://example.com/resource");
            System.out.println(data);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
`,
         };
       case 'Lesson2':
         return {
           javascript: `const axios = require('axios');

// ตรวจสอบและกรองรูปแบบของ URL ด้วย regex
function isValidUrl(url) {
    const urlPattern = /^(https:\/\/(www\.)?example\.com|https:\/\/api\.example\.com)/;
    return urlPattern.test(url);
}

async function fetchData(url) {
    // ตรวจสอบว่า URL เป็นไปตามรูปแบบที่กำหนดหรือไม่
    if (!isValidUrl(url)) {
        throw new Error('รูปแบบ URL ไม่ถูกต้อง');
    }

    // หาก URL ถูกต้อง ให้ส่งคำขอ
    const response = await axios.get(url);
    return response.data;
}

// ตัวอย่างการเรียกใช้ฟังก์ชัน
fetchData('https://example.com/resource')
    .then(data => console.log(data))
    .catch(err => console.error(err));
`,
           python: `import re
import requests

# ตรวจสอบและกรองรูปแบบของ URL ด้วย regex
def is_valid_url(url):
    url_pattern = r'^(https://(www\.)?example\.com|https://api\.example\.com)'
    return bool(re.match(url_pattern, url))

# ฟังก์ชันเพื่อดึงข้อมูล
def fetch_data(url):
    # ตรวจสอบว่า URL เป็นไปตามรูปแบบที่กำหนดหรือไม่
    if not is_valid_url(url):
        raise ValueError('รูปแบบ URL ไม่ถูกต้อง')
    
    # หาก URL ถูกต้อง ให้ส่งคำขอ
    response = requests.get(url)
    return response.json()

# ตัวอย่างการเรียกใช้ฟังก์ชัน
try:
    data = fetch_data('https://example.com/resource')
    print(data)
except Exception as e:
    print(e)
`,
           java: `import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class URLFetcher {

    // ตรวจสอบและกรองรูปแบบของ URL ด้วย regex
    public static boolean isValidUrl(String url) {
        String urlPattern = "^(https://(www\\.)?example\\.com|https://api\\.example\\.com)";
        Pattern pattern = Pattern.compile(urlPattern);
        Matcher matcher = pattern.matcher(url);
        return matcher.matches();
    }

    // ฟังก์ชันเพื่อดึงข้อมูล
    public static String fetchData(String urlString) throws Exception {
        // ตรวจสอบว่า URL เป็นไปตามรูปแบบที่กำหนดหรือไม่
        if (!isValidUrl(urlString)) {
            throw new Exception("รูปแบบ URL ไม่ถูกต้อง");
        }

        // หาก URL ถูกต้อง ให้ส่งคำขอ
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder content = new StringBuilder();

        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();

        return content.toString();
    }

    public static void main(String[] args) {
        try {
            String data = fetchData("https://example.com/resource");
            System.out.println(data);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
`,
         };
   case 'Lesson3':
    return{
      javascript:`const axios = require('axios');
const net = require('net');

// ฟังก์ชันตรวจสอบว่า IP อยู่ใน internal network หรือไม่
function isInternalIp(ip) {
    return (
        ip.startsWith('10.') ||            // Class A private IP
        ip.startsWith('172.16.') ||        // Class B private IP
        ip.startsWith('192.168.') ||       // Class C private IP
        ip === '127.0.0.1'                 // localhost
    );
}

// ฟังก์ชันแปลง URL เป็น IP และตรวจสอบว่าเป็น internal IP หรือไม่
async function fetchData(url) {
    const { hostname } = new URL(url);
    const ip = await new Promise((resolve, reject) => {
        net.lookup(hostname, (err, address) => {
            if (err) reject(err);
            else resolve(address);
        });
    });

    // ตรวจสอบว่า IP อยู่ใน internal network หรือไม่
    if (isInternalIp(ip)) {
        throw new Error('ไม่สามารถส่งคำขอไปยัง internal IP ได้');
    }

    // หากไม่ใช่ internal IP ให้ส่งคำขอ
    const response = await axios.get(url);
    return response.data;
}

// ตัวอย่างการเรียกใช้ฟังก์ชัน
fetchData('https://example.com/resource')
    .then(data => console.log(data))
    .catch(err => console.error(err));
`,
      python:`import socket
import requests

# ฟังก์ชันตรวจสอบว่า IP อยู่ใน internal network หรือไม่
def is_internal_ip(ip):
    return ip.startswith('10.') or \
           ip.startswith('172.16.') or \
           ip.startswith('192.168.') or \
           ip == '127.0.0.1'

# ฟังก์ชันแปลง URL เป็น IP และตรวจสอบว่าเป็น internal IP หรือไม่
def fetch_data(url):
    hostname = url.split('//')[1].split('/')[0]
    ip = socket.gethostbyname(hostname)

    # ตรวจสอบว่า IP อยู่ใน internal network หรือไม่
    if is_internal_ip(ip):
        raise Exception('ไม่สามารถส่งคำขอไปยัง internal IP ได้')

    # หากไม่ใช่ internal IP ให้ส่งคำขอ
    response = requests.get(url)
    return response.text

# ตัวอย่างการเรียกใช้ฟังก์ชัน
try:
    data = fetch_data('https://example.com/resource')
    print(data)
except Exception as e:
    print(e)
`,
      java:`import java.net.InetAddress;
import java.net.URL;
import java.net.HttpURLConnection;
import java.io.InputStreamReader;
import java.io.BufferedReader;

public class FetchData {

    // ฟังก์ชันตรวจสอบว่า IP อยู่ใน internal network หรือไม่
    public static boolean isInternalIp(String ip) {
        return ip.startsWith("10.") ||
               ip.startsWith("172.16.") ||
               ip.startsWith("192.168.") ||
               ip.equals("127.0.0.1");
    }

    // ฟังก์ชันแปลง URL เป็น IP และตรวจสอบว่าเป็น internal IP หรือไม่
    public static String fetchData(String urlString) throws Exception {
        URL url = new URL(urlString);
        String hostname = url.getHost();
        InetAddress inetAddress = InetAddress.getByName(hostname);
        String ip = inetAddress.getHostAddress();

        // ตรวจสอบว่า IP อยู่ใน internal network หรือไม่
        if (isInternalIp(ip)) {
            throw new Exception("ไม่สามารถส่งคำขอไปยัง internal IP ได้");
        }

        // หากไม่ใช่ internal IP ให้ส่งคำขอ
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            response.append(line);
        }

        reader.close();
        return response.toString();
    }

    public static void main(String[] args) {
        try {
            String data = fetchData("https://example.com/resource");
            System.out.println(data);
        } catch (Exception e) {
            e.printStackTrace();
        }
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