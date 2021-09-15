import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { Challenge } from './challenge.model';
import { UpdateChallenge } from './dto/update-challenge';
import { CreateChallenge } from './dto/create-challenge';

@Injectable()
export class ChallengesDao {
  constructor(
    @InjectModel(Challenge.name)
    private readonly _ChallengeModel: Model<Challenge>,
  ) {}

  findOneById(id: string): Observable<Challenge | undefined> {
    return from(this._ChallengeModel.findById(id)).pipe(
      map((Challenge) =>
        !!Challenge ? Challenge.toJSON<Challenge>() : undefined,
      ),
    );
  }

  find(): Observable<any> {
    return from(this._ChallengeModel.find().lean());
  }

  createChallenge(Challenge: CreateChallenge): Observable<Challenge> {
    return from(this._ChallengeModel.create(Challenge)).pipe(
      map((Challenge) =>
        !!Challenge ? Challenge.toJSON<Challenge>() : undefined,
      ),
    );
  }

  updateChallenge(
    id: string,
    Challenge: UpdateChallenge,
  ): Observable<Challenge> {
    return from(
      this._ChallengeModel.findByIdAndUpdate(id, Challenge, { new: true }),
    ).pipe(
      map((Challenge) =>
        !!Challenge ? Challenge.toJSON<Challenge>() : undefined,
      ),
    );
  }

  deleteChallenge(id: string): Observable<Challenge> {
    return from(this._ChallengeModel.findByIdAndDelete(id));
  }
}
