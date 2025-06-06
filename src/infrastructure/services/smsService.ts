// Nên có một ISmsService interface trong domain nếu use cases cần tương tác trực tiếp
class SmsService {
  constructor(private apiKey: string) {
    // Khởi tạo SDK của dịch vụ SMS
  }

  async sendSms(phoneNumber: string, message: string) {
    // Logic gửi tin nhắn SMS
    console.log(`Sending SMS to ${phoneNumber}: "${message}"`);
    // Ví dụ: await someSmsProvider.send({ to: phoneNumber, message, apiKey: this.apiKey });
  }
}

export const smsService = new SmsService(process.env.SMS_API_KEY || '');