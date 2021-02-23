import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserHelper } from '../helpers/user.helper';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { UserModel } from '../models/user.model';
import { ActionModel } from '../models/action.model';
import { ActionUserCacheEnum } from '../enums/store/action-user-cache.enum';

@Injectable()

export class UserEffects {
    /**
   * Property with "Effect" decorator defines action type to trigger described logic.
   * Function "ofType" defines action type, mergeMap handles multiple triggers.
   * @type { Observable<ActionModel<UserModel[]>> }
   */
    @Effect()
    public allUsers: Observable<ActionModel<UserModel[]>> = this.actions
        .pipe<ActionUserCacheEnum.Load, ActionModel<UserModel[]>>(
        ofType<never, ActionUserCacheEnum.Load, Action>(ActionUserCacheEnum.Load),
        mergeMap<ActionUserCacheEnum.Load, ActionModel<UserModel[]>>(
            (): Observable<ActionModel<UserModel[]>> => this.getUsers()
        )
        // Use switchMap instead to handle only last call from store
    );

    constructor(private http: HttpClient, private actions: Actions) {}

    /**
    * Method loads user list and returns prepared action model to sent to subscribers via NGRX store.
    * Returned action model is for placing loaded users in the user cache in store.
     * @returns { Observable<ActionModel<UserModel[]>> }
    * @async
    */
    public getUsers(): Observable<ActionModel<UserModel[]>> {
        return this.http
        .get<KeyValueInterface<any>[]>('https://jsonplaceholder.typicode.com/users')
        .pipe<ActionModel<UserModel[]>>(
            map<KeyValueInterface<any>[], ActionModel<UserModel[]>>(
            (data: KeyValueInterface<any>[]): ActionModel<UserModel[]> => {
                return new ActionModel<UserModel[]>({
                type: ActionUserCacheEnum.Add,
                payload: UserHelper.createUserModelArray(data)
                });
            }
            )
        );
    }
}
