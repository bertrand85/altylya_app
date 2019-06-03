import { Pipe, PipeTransform } from '@angular/core';

//import { UserData } from '../../providers/user-data';
/**
 * Generated class for the AvidestinationPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'avidestination',
})
export class AvidestinationPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {

    const dest = args[0][0];
    if(dest==null)
      return value;
    let d = dest.find( function(element){
      return element.id==value;
    })

    if(d)
      return d.name;
    else
      return value;
  }
}
