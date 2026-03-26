@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: +process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async send(to: string, subject: string, content: string) {
        return this.transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            html: content,
        });
    }
}