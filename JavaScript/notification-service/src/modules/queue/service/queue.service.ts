@Injectable()
export class QueueService {
    constructor(
       @InjectQueue('email-queue')
       private emailQueue: Queue
    ) {}

    async addEmailJob(data: any){
        await this.emailQueue.add('send-email', data, {
            attempts: 3,
            backoff: 5000,
        });
    }
}