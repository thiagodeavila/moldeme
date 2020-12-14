import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';
import { Subscription } from 'rxjs';
import { Fabric, IFabricItem, IFabricItems } from '../shared/model/fabric.model';
import { IAuth, Login } from '../shared/model/login.model';
import { FabricService } from '../shared/services/fabric.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    authToken: IAuth = new Login();
    fabricList: IFabricItems = new Fabric();
    fabricRequest: Subscription;
    fabricRegister: Subscription;

    fabricForm: IFabricItem = new Fabric();

    bestShirtData: any;

    constructor(private fabricService: FabricService) { }

    ngOnInit(): void {
        this.fabricList.data = [];
        this.authToken = JSON.parse(localStorage.getItem('authToken'));

        this.fabricRequest = this.fabricService
            .get()
            .subscribe(
            (response: IFabricItems) => {
                this.fabricList = response;
            },
            err => {
                console.log(err);
            });

        this.bestShirt();
    }

    calculateShirt(tableItem: IFabricItem): number{
        const shirtNumber = ((tableItem.length * tableItem.width) / 100) / 8.75;
        return Math.floor(shirtNumber);
    }

    bestShirt(): any{
        const bestFabric = {
            name: '',
            fabricPrice: 0.00,
            totalPrice: 0.00
        };
        let freight = 0.00;

        this.fabricList.data.map((item: any) => {
            const shirtNumber = this.calculateShirt(item);
            let totalPrice = 0.00;

            if (bestFabric.fabricPrice === 0){
                bestFabric.fabricPrice = item.price;
            }

            if ((item.price / shirtNumber) < bestFabric.fabricPrice) {
                freight = (((item.width * item.length) / 100) * (item.grammage / 1000)) * 5.45;
                totalPrice = bestFabric.fabricPrice + freight;
                bestFabric.name = item.name;
                bestFabric.fabricPrice = item.price;
                bestFabric.totalPrice =  totalPrice;
            }
            this.bestShirtData = bestFabric;
        });
        return bestFabric;
    }

    onSave(fabric: NgForm): void{
        this.fabricForm = fabric.value;

        this.fabricRegister = this.fabricService
        .create(this.fabricForm)
        .subscribe(
        (response: IFabricItem) => {
            this.fabricList.data.unshift(response);
        },
        err => {
            console.log(err);
        });
    }

}
