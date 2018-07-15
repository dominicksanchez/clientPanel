import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
	clients:any[];
	totalOwed:number;

	constructor(public clientService:ClientService) {

	}

	ngOnInit() {
		this.clientService.getClients().subscribe(clients => {
			this.clients = clients;
			this.getTotalOwed();
		});

		
	}

	getTotalOwed() {
		let total = 0;
		for(let x = 0; x < this.clients.length; x++) {
			total += parseFloat(this.clients[x].balance);
		}

		this.totalOwed = total;
	}

}
