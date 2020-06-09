import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public localUser: any
  public localName: string = "stranger"
  public name: string

  constructor(private data: DataService, public router: Router) { }

  ngOnInit() {
    this.data.currentName.subscribe(name => this.name = name)
   
    if (sessionStorage.f_name){
      this.name = sessionStorage.f_name
    }  
  }

  public logout(){
    sessionStorage.clear()
    this.router.navigateByUrl("/login") 
    this.data.changeName('guest')  
    this.data.changeIsLogged(false)
  }

}
