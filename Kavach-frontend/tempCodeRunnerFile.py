
    secure_qr = AadhaarSecureQr(qrData)
    decoded_secure_qr_data = secure_qr.decodeddata()
    print(decoded_secure_qr_data)