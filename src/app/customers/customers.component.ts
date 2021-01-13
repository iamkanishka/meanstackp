import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay, tap, startWith, } from "rxjs/operators";

import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

// import * as moment from "moment"
// import { DataService } from '../data/data.service';
import { MatSnackBar } from "@angular/material/snack-bar";

import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

import { DataService } from "../data/data.service";
import * as XLSX from 'xlsx';
import { of } from "rxjs";

export interface customers {
  fullname?: string;
  age?: string;
  gender?: string;
 phone?:string;
  userid?: string;
  id?: string;
  _id?: string;
  
}

export interface Food {
  value: string;
  viewValue: string;
}


export class District {
  value: string;
}

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"]
})
export class CustomersComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Large)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  displayedColumns = [
    "no",
    "firstname",
    "age",
    "gender",
    "phone",
   
    "actions"
  ];
  dataSource = new MatTableDataSource<customers>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ssdetails: Observable<any[]>;
  ssdetname: string;
  showaddc: boolean = false;
  flform: FormGroup;
showcsv:boolean=false
 


  spform: FormGroup;
  headstring: string = "Add";

  clearsalesid: string;

  showbenifits:boolean=false;

  showothdet:Boolean=false;
  showbut: boolean = true;
  showform: boolean = false;

  showaddemp: boolean = true;
  showup: boolean = false;
  showssaldet: boolean = false;

  checkmob: customers[] = [];
  showotherdetails:any
  ordbut: boolean = true;
  ordphone: boolean = false;

  mmydata:Observable<any[]>;
  name = 'This is XLSX TO JSON CONVERTER';

  base64File: string = null;
  filename: string = null;

  datest: any;

  foods: Food[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" }
  ];
  sdtform: FormGroup;
  apform: FormGroup;
  abs: string = "Add";
  len: number;
  clen: number;

  cgvform: FormGroup;

showphstat:boolean=false;
showphmes:string
  pppform: FormGroup
  isConnected = true;
  status = "Online";
  checktimes: number = 0;

  aibform:FormGroup


  sdistrict: FormControl
  inin: number;
  constructor(

    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    public d: DataService,

    private _snackBar: MatSnackBar,
   
    private router: Router,
    private http: HttpClient,
  ) {


    if(this.d.myauth==false){
       this.router.navigate(["/"]).then(()=>{
       })
    }




  //  const li = String(d.persons.licno);


this.mydata()

  }




  








  displayFn(user?: any): string | undefined {
    return user ? user : undefined;
  }

 

 



  ngOnInit() {

    this.sdistrict = new FormControl('', Validators.required);

    // var a = moment("1/7/2018", "DD/MM/YYYY");
    // var b = moment("10/7/2018", "DD/MM/YYYY");
    // var days = b.diff(a, "days");
    //// console.log(days);




   




    this.flform = this.fb.group({
      fullname: ["", [Validators.required,]],
      age: ["", [Validators.required,Validators.pattern(/^(0|[1-9]\d*)?$/)]],
      gender:["", [Validators.required,]],
      phone: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10),Validators.pattern(/^(0|[1-9]\d*)?$/)]],

    });



  

  



   





  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showadd() {
    this.showaddc = true;
  }

  cancel() {
    this.showaddc = false;
    this.flform.reset();
    
    this.headstring = "Add";
    this.showaddemp = true;
    this.showup = false;
  }

  cusfill: any;


  adhfill: any;
  orddpp: number


















  async addemp() {

    //// console.log(this.len);
    this.abs = "Creating...";








    const flvalue = this.flform.value;
  
    
    
    const empdet = {
      ...flvalue,
   
    };

    console.log(empdet)

   
  //  const cid = this.afs.AddId();
   // const li = String(this.d.persons.licno);

//    var senddata = this.afs.firestore.collection("customers").doc(cid);

    try {
      const data: any[] = [];

        //  transaction.update(Ahome, { ycuscount: increment })
        data['userid']=this.d.uudata._id

        const dd={ ...empdet, ...data }
       // console.log(dd);
        
const io=this.http.post('https://mean-persons.herokuapp.com/persons',dd,{responseType: 'json'}).subscribe((resdata)=>{

console.log(resdata);


this._snackBar.open("Person Added", "OK", {
  duration: 10000
});


this.mydata()

this.flform.reset();



this.abs = "Add";

this.showaddc = false;
})




    } catch (err) {
     console.error(err);
     console.log(err);
    }

  }

  getdata: any;
 

  editloaddata(datar: any) {



    //// console.log(datar.date)
    this.getdata = datar;
    this.showaddemp = false;
    this.showup = true;
    this.headstring = "Edit";
 console.log(datar);
    this.showaddc = true;
    
          this.flform.patchValue({
            fullname: datar.fullname,
            age: datar.age,
            gender:datar.gender,
            phone:datar.phone

          });
     



         


      
      
      
     


       
  }
  aus: string = "Update";

  async updatedata() {


    this.aus = "Updating...";
    const flvalue = this.flform.value;
   
    
    // // console.log(wsvalue.date);
    
    //console.log(wsvalue.date.toDateString());
    const cusdet = {
      ...flvalue,
   
    };
   
    


    this.http.patch('https://mean-persons.herokuapp.com/persons/'+String(this.getdata.id), cusdet,{ responseType: 'json' })
    .subscribe(res=>{
   // console.log(res);
    this.mydata()
    this._snackBar.open("Person Updated", "OK", {
              duration: 5000
            });
  
    this.flform.reset();
 
          this.showaddc = false;
          this.headstring = "Add";
          this.aus = "Update";
    
    })    


    this.showaddemp = true;
    this.showup = false;


















































  }






  ondelete(id: string) {
    var check = confirm("Are you Sure You want to delete this User?...")
    if (check) {
      
      this.http.delete('https://mean-persons.herokuapp.com/persons/'+id, { responseType: 'json' })
      .subscribe(res=>{
       // console.log(res);

        this.mydata()
        
      })      
      

    }
  }

  sdetailsupdateid: string;
  showssdetails(dataaa: any) {
    //  // console.log(dataaa);
    this.ssdetails = dataaa.sdetails;
    this.ssdetname = dataaa.fullname;
    this.sdetailsupdateid = dataaa.id
  }









   mydata(){
  console.log(this.d.uudata)
const ujuju=  this.http.get<customers[]>('https://mean-persons.herokuapp.com/persons/'+this.d.uudata._id, { responseType: 'json' })
.subscribe(res=>{



  res.map(a=>{

   const data = Object.assign(
        a as customers,
       
      {id : a._id},
      {jwt : a._id},
      {uid : a.userid},
      

      );

     
      return { ...data };
  
  })

 console.log(res);
  
  
  this.len = Object.keys(res).length;

  this.checkmob = res
  this.dataSource.data = res;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

 // console.log(res);
  
})
}










cusrepshow:any[]
fname:string;
fdate:string;
counter:number=0

collcom:boolean=true









}
