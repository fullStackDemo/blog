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
	public  String MD5_16bit(String readyEncryptStr) throws NoSuchAlgorithmException {
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
	public  static   String MD5_32bit(String readyEncryptStr) throws NoSuchAlgorithmException {
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
	
	// test
//	public static void main(String[] args) {
//		try {
//			String md516 = MD5Utils.MD5_16bit("admin123!");
//			System.out.println("16bit-md5:\n" + md516);
//			String md532 = MD5Utils.MD5_32bit("admin123!");
//			System.out.println("32bit-md5:\n" + md532);
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
}
