import { ErrorHandler, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IMessage } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements ErrorHandler {

  constructor(
    private toastrService: ToastrService,
  ) { }

  handleError(error: IMessage): void {
    throw new Error('Method not implemented.');
  }

  showSucess(msg: IMessage) {
    this.toastrService.success(msg.message, msg.title)
  }

  showError(msg: IMessage) {
    this.toastrService.error(msg.message, msg.title)
  }

  showWarning(msg: IMessage) {
    this.toastrService.warning(msg.message, msg.title);
  }
}
