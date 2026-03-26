import {NotificationService} from "../services/notification.service";
import {CreateNotificationDto} from "../dto/create-notification.dto";

@Controller('notifications')
export class NotificationController {
    constructor(private readonly service: NotificationService) {}

    @Post('email')
    send(@Body() dto: CreateNotificationDto) {
        return this.service.createAndDispatch(dto);
    }
}