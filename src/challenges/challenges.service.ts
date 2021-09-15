import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, mergeMap, Observable, of, throwError } from 'rxjs';
import { Challenge } from './challenge.model';
import { UpdateChallenge } from './dto/update-challenge';
import { CreateChallenge } from './dto/create-challenge';
import { ChallengesDao } from './challenges.dao';

@Injectable()
export class ChallengesService {
  constructor(private readonly dao: ChallengesDao) {}

  findOneById(id: string): Observable<Challenge> {
    return this.dao.findOneById(id).pipe(
      catchError(() => throwError(() => new UnprocessableEntityException())),
      mergeMap((board: Challenge) =>
        !!board ? of(board) : throwError(() => new NotFoundException()),
      ),
    );
  }

  find(): Observable<Challenge[]> {
    return this.dao
      .find()
      .pipe(
        catchError(() => throwError(() => new UnprocessableEntityException())),
      );
  }

  createChallenge(args: CreateChallenge): Observable<Challenge> {
    return this.dao.createChallenge(args).pipe(
      catchError((err) => {
        if (err.code === 11000) {
          return throwError(() => new ConflictException());
        } else {
          return throwError(() => new UnprocessableEntityException());
        }
      }),
    );
  }

  updateChallenge(id: string, args: UpdateChallenge): Observable<Challenge> {
    return this.dao.updateChallenge(id, args).pipe(
      catchError((err) => {
        if (err.code === 11000) {
          return throwError(() => new ConflictException());
        } else {
          return throwError(() => new UnprocessableEntityException());
        }
      }),
      mergeMap((board: Challenge) =>
        !!board ? of(board) : throwError(() => new NotFoundException()),
      ),
    );
  }

  deleteChallenge(id: string): Observable<Challenge> {
    return this.dao.deleteChallenge(id).pipe(
      catchError(() => throwError(() => new UnprocessableEntityException())),
      mergeMap((board: Challenge) =>
        !!board ? of(board) : throwError(() => new NotFoundException()),
      ),
    );
  }

  private checkElement(res: any) {
    return of(res).pipe(
      catchError((err) => {
        if (err.code === 11000) {
          return throwError(() => new ConflictException());
        } else {
          return throwError(() => new UnprocessableEntityException());
        }
      }),
      mergeMap((board: Challenge) =>
        !!board ? of(board) : throwError(() => new NotFoundException()),
      ),
    );
  }
}
