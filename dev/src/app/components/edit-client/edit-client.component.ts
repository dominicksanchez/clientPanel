import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	selector: 'app-edit-client',
	templateUrl: './edit-client.component.html',
	styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
	id:string;
	client:Client = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		balance: 0
	}
	disableBalanceOnEdit:boolean = true;

	constructor(
		public toastr: ToastsManager, vcr: ViewContainerRef,
		public clientService: ClientService,
		public flashMessagesService: FlashMessagesService,
		public router: Router,
		public route: ActivatedRoute,
		public settingsService: SettingsService
	) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit() {
		this.id = this.route.snapshot.params['id'];

		this.clientService.getClient(this.id).subscribe(client => {
			this.client = client;
		});

		this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
	}

	onSubmit({value, valid}:{value:Client, valid:boolean}) {
		if(!valid) {
			this.toastr.error('Please fill in all fields', 'Oops!');
			this.router.navigate(['/edit-client/'+this.id]);
		}else {
			this.clientService.updateClient(this.id, value);
			
			this.toastr.success('Client detail was updated', 'Success', {
				dismiss: 'controlled',
				showCloseButton: true
			});
		}
	}
}
