package hello;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Utils {
	/**
	 * Determine encrypt algorithm MD5
	 */
	private static final String ALGORITHM_MD5 = "MD5";
	
	/**
	 * MD5 16bit Encrypt Methods.
	 *
	 * @param readyEncryptStr ready encrypt string
	 * @return String encrypt result string
	 */
	private String MD5_16bit(String readyEncryptStr) throws NoSuchAlgorithmException {
		if (readyEncryptStr != null) {
			System.out.println(MD5_32bit(readyEncryptStr));
			return MD5_32bit(readyEncryptStr).substring(8, 24);
		} else {
			return null;
		}
	}
	
	/**
	 * MD5 32bit Encrypt Methods.
	 *
	 * @param readyEncryptStr ready encrypt string
	 * @return String encrypt result string
	 * @throws NoSuchAlgorithmException
	 */
	public static String MD5_32bit(String readyEncryptStr) throws NoSuchAlgorithmException {
		if (readyEncryptStr != null) {
			//Get MD5 digest algorithm's MessageDigest's instance.
			MessageDigest md = MessageDigest.getInstance(ALGORITHM_MD5);
			//Use specified byte update digest.
			md.update(readyEncryptStr.getBytes());
			//Get cipher text
			byte[] b = md.digest();
			//The cipher text converted to hexadecimal string
			StringBuilder su = new StringBuilder();
			//byte array switch hexadecimal number.
			for (int offset = 0, bLen = b.length; offset < bLen; offset++) {
				String haxHex = Integer.toHexString(b[offset] & 0xFF);
				if (haxHex.length() < 2) {
					su.append("0");
				}
				su.append(haxHex);
			}
			return su.toString();
		} else {
			return null;
		}
	}
	
	public static String MD5_32bit1(String readyEncryptStr) throws NoSuchAlgorithmException {
		if (readyEncryptStr != null) {
			//The cipher text converted to hexadecimal string
			StringBuilder su = new StringBuilder();
			//Get MD5 digest algorithm's MessageDigest's instance.
			MessageDigest md = MessageDigest.getInstance(ALGORITHM_MD5);
			byte[] b = md.digest(readyEncryptStr.getBytes());
			int temp = 0;
			//byte array switch hexadecimal number.
			for (int offset = 0, bLen = b.length; offset < bLen; offset++) {
				temp = b[offset];
				if (temp < 0) {
					temp += 256;
				}
				int d1 = temp / 16;
				int d2 = temp % 16;
				su.append(Integer.toHexString(d1) + Integer.toHexString(d2));
			}
			return su.toString();
		} else {
			return null;
		}
	}
	
	/**
	 * transform  char to ascii
	 */
	private static String transformToAscII(String readyEncryptStr) {
		byte[] bytes = readyEncryptStr.getBytes();
		String result = "";
		for (int i = 0; i < bytes.length; i++) {
			System.out.println(bytes[i]);
			result += bytes[i];
		}
		return result;
	}
	
	
	// test
	public static void main(String[] args) {
		try {
			String testStr = "testadmintest1qaz2wsx@123test123";
			String result = transformToAscII(testStr);
			String md532 = MD5Utils.MD5_32bit(result);
			System.out.println("32bit-md5:\n" + md532);
			String md532_double = MD5Utils.MD5_32bit((md532));
			System.out.println("32bit-md5:\n" + md532_double);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
