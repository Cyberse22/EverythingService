import {Notification} from "../entities/notification.entity";
import {Repository} from "typeorm";
import {CreateNotificationDto} from "../dto/create-notification.dto";

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private repo: Repository<Notification>,
        private queueService: QueueService,
    )
    {}
    async createAndDispatch(dto: CreateNotificationDto){
        const notification = this.repo.create({
            ...dto,
            type: 'EMAIL',
            status: 'PENDING',
        });

        await this.repo.save(notification);
        await this.queueService.addEmailJob({
            notificationId: notification.id,
            ...dto,
        });

        return notification;
    }
}