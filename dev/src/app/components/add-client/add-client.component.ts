import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	selector: 'app-add-client',
	templateUrl: './add-client.component.html',
	styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
	client:Client = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		balance: 0
	}

	disabledBalanceOnAdd:boolean = true;

	constructor(
		public toastr: ToastsManager, vcr: ViewContainerRef,
		public flashMessagesService: FlashMessagesService,
		public router: Router,
		public clientService: ClientService,
		public settingsService: SettingsService
	) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit() {
		this.disabledBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
	}

	onSubmit({value, valid}:{value:Client, valid:boolean}) {
		if(this.disabledBalanceOnAdd) {
			value.balance = 0;
		}
		if(!valid) {
			this.toastr.error('Please fill in all fields', 'Oops!');
			this.router.navigate(['add-client']);
		}else {
			this.clientService.newClient(value);
			this.toastr.success('New client was added', 'Success');
			this.router.navigate(['/']);
		}
	}
}
