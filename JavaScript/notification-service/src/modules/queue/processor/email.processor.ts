@Processor('email-queue')
export class EmailProcessor {
    constructor(
        private emailService
    )
    {}
}