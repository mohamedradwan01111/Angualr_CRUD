import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { EmployeeModel } from '../employee-dashboard.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  employeeModelObj:EmployeeModel=new EmployeeModel();
  employeeData !:any;
  showAdd !:boolean;
  showUpdate !:boolean;
  constructor(private formbuilder:FormBuilder , private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:[''],
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd =true;
    this.showUpdate=false;
  }
postEmployeeDetalis(){
  this.employeeModelObj.firstName =this.formValue.value.firstName;
  this.employeeModelObj.lastName =this.formValue.value.lastName;
  this.employeeModelObj.email =this.formValue.value.email;
  this.employeeModelObj.mobile =this.formValue.value.mobile;
  this.employeeModelObj.salary =this.formValue.value.salary;

  this.api.postEmployee(this.employeeModelObj).subscribe((res: any)=>{

    console.log(res);
    alert("Employee Add Successfully");
    let ref =document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee();
  },
    (  err: any)=>{
    alert("something went wrong");
  })
}
getAllEmployee(){
  this.api.getEmployee().subscribe((res)=>{
    this.employeeData =res;
  })
}
deleteEmployee(x:any){
  this.api.deleteEmployee(x.id).subscribe((res)=>{
    alert("Employee Deleted");
    this.getAllEmployee();
  })
}
onEdit(x:any){
  this.showAdd =false;
    this.showUpdate=true;
  this.employeeModelObj.id=x.id;
  this.formValue.controls['firstName'].setValue(x.firstName);
  this.formValue.controls['lastName'].setValue(x.lastName);
  this.formValue.controls['email'].setValue(x.email);
  this.formValue.controls['mobile'].setValue(x.mobile);
  this.formValue.controls['salary'].setValue(x.salary);
}
updateEmployeeDetalis(){
  this.employeeModelObj.firstName =this.formValue.value.firstName;
  this.employeeModelObj.lastName =this.formValue.value.lastName;
  this.employeeModelObj.email =this.formValue.value.email;
  this.employeeModelObj.mobile =this.formValue.value.mobile;
  this.employeeModelObj.salary =this.formValue.value.salary;
   this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id).subscribe((res)=>{
    alert("updated Successfully");
    let ref =document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee();
   })
}
}


