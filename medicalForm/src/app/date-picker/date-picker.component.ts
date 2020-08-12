import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
	selector: 'app-date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
    @Output() finalizedDate: EventEmitter<any> = new EventEmitter<any>();	

    date = new Date()
	day = '';
	month = '';
	year = '';	
	days = [];
	months = [];
	thirtyOneDaysMonths = [1,3,5,7,8,10,12];
	thirtyDaysMonths = [2,4,6,9,11];
	thirtyDaysFebMonths = [4,6,9,11];
	years = [];
	dateError:boolean = false;
	monthError:boolean = false;
	yearError:boolean = false;
	constructor() {
		this.days = this.generateRange(1,31)
		this.months = this.generateRange(1,12)
		this.years = this.generateRange(1950, this.date.getFullYear())
	 }

	ngOnInit() {
	}
	dayChange(){
		if(/\b(0?[1-9]|[12][0-9]|3[01])\b/.test(this.day)){
			console.log(this.day);
			this.dateError = false
			this.dateSubmitted();
		}
		else{
			this.dateError = true
		}

	}
	monthChange(){
		if(/^([1-9]|1[012])$/.test(this.month)){
			console.log(this.month);
			this.monthError = false
			this.dateSubmitted()
		}
		else{
			this.monthError = true
		}
		console.log(this.month)
		
		
		console.log("event in month ====+> ")
	}
	yearChange(){
		if(/^[0-9]{4}$/.test(this.year)){
			console.log(this.year);
			this.yearError = false
			this.dateSubmitted()
		}
		else{
			this.yearError = true
		}
		console.log("event in year ====+> ")
	}
	dateSubmitted(){
		if(!this.dateError && !this.yearError && !this.monthError && this.day && this.month &&  this.year){
			let finalDate = this.month+"/"+this.day+"/"+this.year
			this.finalizedDate.emit({finalDate})
			console.log("FIna date ==>", finalDate);

		}
		// let finalDate = this.day+"/"+this.month+"/"+this.year
	}

	generateRange(start, end) {
    return _.range(start, end + 1, 1)

  }
}
