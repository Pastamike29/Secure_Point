
import { CodeSnippets } from "../CodeSnippets";

export const getSoftwareAndDataIntegrityFailures = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `const crypto = require('crypto');

// ฟังก์ชันสร้าง Digital Signature
function signData(data, privateKey) {
  const signer = crypto.createSign('sha256');
  signer.update(data);
  signer.end();
  const signature = signer.sign(privateKey, 'hex');
  return signature;
}

// ฟังก์ชันตรวจสอบ Digital Signature
function verifyData(data, publicKey, signature) {
  const verifier = crypto.createVerify('sha256');
  verifier.update(data);
  verifier.end();
  return verifier.verify(publicKey, signature, 'hex');
}

// ตัวอย่างการใช้งาน
const data = 'Important data';
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

const signature = signData(data, privateKey);
const isVerified = verifyData(data, publicKey, signature);

console.log('Signature Verified:', isVerified);
`,
           python: `from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import serialization

# ฟังก์ชันสร้าง Digital Signature
def sign_data(data, private_key):
    signature = private_key.sign(
        data.encode(),
        padding.PKCS1v15(),
        hashes.SHA256()
    )
    return signature

# ฟังก์ชันตรวจสอบ Digital Signature
def verify_data(data, public_key, signature):
    try:
        public_key.verify(
            signature,
            data.encode(),
            padding.PKCS1v15(),
            hashes.SHA256()
        )
        return True
    except Exception as e:
        return False

# ตัวอย่างการใช้งาน
data = 'Important data'
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048
)
public_key = private_key.public_key()

signature = sign_data(data, private_key)
is_verified = verify_data(data, public_key, signature)

print(f'Signature Verified: {is_verified}')
`,
           java: `import java.security.*;
import java.util.Base64;

public class DigitalSignatureExample {

    // ฟังก์ชันสร้าง Digital Signature
    public static String signData(String data, PrivateKey privateKey) throws Exception {
        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initSign(privateKey);
        signature.update(data.getBytes());
        byte[] signedData = signature.sign();
        return Base64.getEncoder().encodeToString(signedData);
    }

    // ฟังก์ชันตรวจสอบ Digital Signature
    public static boolean verifyData(String data, PublicKey publicKey, String signature) throws Exception {
        Signature sig = Signature.getInstance("SHA256withRSA");
        sig.initVerify(publicKey);
        sig.update(data.getBytes());
        byte[] decodedSignature = Base64.getDecoder().decode(signature);
        return sig.verify(decodedSignature);
    }

    public static void main(String[] args) throws Exception {
        String data = "Important data";

        // สร้าง Key Pair
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(2048);
        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        PrivateKey privateKey = keyPair.getPrivate();
        PublicKey publicKey = keyPair.getPublic();

        // สร้าง Signature
        String signature = signData(data, privateKey);
        
        // ตรวจสอบ Signature
        boolean isVerified = verifyData(data, publicKey, signature);

        System.out.println("Signature Verified: " + isVerified);
    }
}
`,
         };
       case 'Lesson2':
         return {
           javascript: `// ตัวอย่างการตั้งค่า CSP ใน HTTP Header โดยใช้ Express.js
const express = require('express');
const app = express();

// การกำหนด CSP
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'"
  );
  next();
});

// การตั้งค่าเซิร์ฟเวอร์และเส้นทาง
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Secure Website</h1>');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
`,
           python: `from flask import Flask, make_response

app = Flask(__name__)

# การกำหนด CSP
@app.after_request
def set_csp(response):
    response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self'; style-src 'self'"
    return response

# การตั้งค่าเซิร์ฟเวอร์และเส้นทาง
@app.route('/')
def home():
    return '<h1>Welcome to the Secure Website</h1>'

if __name__ == '__main__':
    app.run(port=3000)
`,
           java: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

@SpringBootApplication
public class SecureApplication {

    public static void main(String[] args) {
        SpringApplication.run(SecureApplication.class, args);
    }

    @RestController
    @RequestMapping("/")
    public class HomeController {

        @GetMapping
        public ResponseEntity<String> home() {
            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_SECURITY_POLICY, "default-src 'self'; script-src 'self'; style-src 'self'")
                .body("<h1>Welcome to the Secure Website</h1>");
        }
    }
}
`,
         };
   
    
   
       default:
         return {
           javascript: `console.log('Directory Traversal default code');`,
         };
     }
   };