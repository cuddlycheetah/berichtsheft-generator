// custom-date-time-adapter.class.ts
import { Injectable } from '@angular/core';
import { DateTimeAdapter } from 'ng-pick-datetime';

@Injectable()
export class MinuteCountDateTimeAdapter extends DateTimeAdapter<number> {
    getYear(date: any): number {
        return 0;
    }
    getMonth(date: any): number {
        return 0;
    }
    getDay(date: any): number {
        return 0;
    }
    getDate(date: any): number {
        return 0;
    }
    getHours(date: any): number {
        return Math.floor(date / 60);
    }
    getMinutes(date: any): number {
        return date % 60;
    }
    getSeconds(date: any): number {
        return 0;
    }
    getTime(date: any): number {
        return 0;
    }
    getNumDaysInMonth(date: any): number {
        return 0;
    }
    differenceInCalendarDays(dateLeft: any, dateRight: any): number {
        return 0;
    }
    getYearName(date: any): string {
        return '';
    }
    getMonthNames(style: "long" | "short" | "narrow"): string[] {
        return [];
    }
    getDayOfWeekNames(style: "long" | "short" | "narrow"): string[] {
        return [];
    }
    getDateNames(): string[] {
        return [];
    }
    toIso8601(date: any): string {
        return date.toString();
    }
    isEqual(dateLeft: any, dateRight: any): boolean {
        return dateLeft === dateRight;
    }
    isSameDay(dateLeft: any, dateRight: any): boolean {
        return false;
    }
    isValid(date: any): boolean {
        return !isNaN(date) && date >= 0 && date <= ((23 * 60) + 59);
    }
    invalid() {
        return -1;
    }
    isDateInstance(obj: any): boolean {
        return typeof(obj) === 'number';
    }
    addCalendarYears(date: any, amount: number) {
        return date;
    }
    addCalendarMonths(date: any, amount: number) {
        return date;
    }
    addCalendarDays(date: any, amount: number) {
        return date;
    }
    setHours(date: any, amount: number) {
        const minutes = date % 60;
        return minutes + (amount * 60);
    }
    setMinutes(date: any, amount: number) {
        const hours = Math.floor(date / 60);
        return (hours  * 60) + amount;
    }
    setSeconds(date: any, amount: number) {
        return 0;
    }
    createDate(year: number, month: number, date: number);
    createDate(year: number, month: number, date: number, hours: number, minutes: number, seconds: number);
    createDate(year: any, month: any, date: any, hours?: any, minutes?: any, seconds?: any) {
        return (hours * 60) + minutes;
    }
    clone(date: any) {
        return 0 + date;
    }
    now() {
        return 0;
    }
    format(date: any, displayFormat: any): string {
        return date;
    }
    parse(value: any, parseFormat: any) {
        return parseInt(value);
    }
}
