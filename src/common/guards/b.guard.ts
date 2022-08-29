import { ExecutionContext, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

export class BGuard extends AuthGuard(['b', 'c']) {}
