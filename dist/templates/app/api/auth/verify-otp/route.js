var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { NextResponse } from 'next/server';
import { verifyOTP, createSession } from '../../../../utils/auth';
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userId, otp, email, isValid, token, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, request.json()];
                case 1:
                    _a = _b.sent(), userId = _a.userId, otp = _a.otp, email = _a.email;
                    console.log('Received OTP verification request:', { userId: userId, otp: otp, email: email });
                    if (!userId || !otp || !email) {
                        console.log('Missing userId, otp, or email in request');
                        return [2 /*return*/, NextResponse.json({ error: 'User ID, OTP, and email are required' }, { status: 400 })];
                    }
                    isValid = verifyOTP(userId, otp);
                    console.log('OTP verification result for userId:', userId, 'isValid:', isValid);
                    if (!isValid) {
                        console.log('Invalid or expired OTP for userId:', userId);
                        return [2 /*return*/, NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })];
                    }
                    return [4 /*yield*/, createSession(userId)];
                case 2:
                    token = _b.sent();
                    return [2 /*return*/, NextResponse.json({ success: true, token: token })];
                case 3:
                    error_1 = _b.sent();
                    console.error('OTP Verification Error:', error_1);
                    return [2 /*return*/, NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
