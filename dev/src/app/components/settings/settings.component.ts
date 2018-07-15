import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from '../../models/Settings';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	settings:Settings;
	constructor(
		public toastr: ToastsManager, vcr: ViewContainerRef,
		public settingsService: SettingsService,
		public router: Router,
		public flashMessagesService: FlashMessagesService
	) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit() {
		this.settings = this.settingsService.getSettings();
	}

	onSubmit() {
		this.settingsService.changeSettings(this.settings);
		this.toastr.success('Settings was saved', 'Success');
		this.router.navigate(['/settings']);
	}

}
