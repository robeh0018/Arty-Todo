import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppLoadingService {

  private isLoading: WritableSignal<boolean> = signal<boolean>(false);

  public getIsLoading() {
    return this.isLoading;
  };

  public setIsLoading(value: boolean): void {
    this.isLoading.set(value);
  }
}
