import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	selector: 'app-client-details',
	templateUrl: './client-details.component.html',
	styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
	id:string;
	client: Client;
	hasBalance: boolean = false;
	showBalanceUpdateInput:boolean = false;

	constructor(
		public toastr: ToastsManager, vcr: ViewContainerRef,
		public clientService: ClientService,
		public flashMessagesService: FlashMessagesService,
		public router: Router,
		public route: ActivatedRoute
	) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit() {
		// get ID
		this.id = this.route.snapshot.params['id'];

		// Get Client
		this.clientService.getClient(this.id).subscribe(client => {
			if(client.balance > 0) {
				this.hasBalance = true;
			}else {
				this.hasBalance = false;
			}

			this.client = client;
		});
	}

	updateBalance(id:string) {
		this.clientService.updateClient(id, this.client);
		this.toastr.success('Balance Updated', 'Success');
		this.router.navigate(['/client/'+this.id]);
	}

	onDeleteClick() {
		if(confirm("Are you sure to delete?")) {
			this.clientService.deleteClient(this.id);
			this.toastr.success('Client Deleted', 'Success');
			this.router.navigate(['/']);
		}
	}
}
