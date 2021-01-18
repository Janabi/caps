'use strict';

const eventEmitter = require('../caps');

describe(('Checking on each events'), ()=>{
    it('pickup action name', ()=>{
        let obj ={
            store: 'Hello',
            orderID: 23,
            customer: 'Janabi',
            address: 'Amman, Jordan'
        }
        let pickup = eventEmitter.emit('pickup', obj, obj.orderID);
        let time = new Date();
        time = time.toUTCString();
        expect(pickup).toBeTruthy();
    })

    it('in-transit action name', ()=>{
        let obj ={
            store: 'Hello',
            orderID: 23,
            customer: 'Janabi',
            address: 'Amman, Jordan'
        }
        let intransit = eventEmitter.emit('in-transit', obj, obj.orderID);
        let time = new Date();
        time = time.toUTCString();
        expect(intransit).toBeTruthy();
    })

    it('delivered action name', ()=>{
        let obj ={
            store: 'Hello',
            orderID: 23,
            customer: 'Janabi',
            address: 'Amman, Jordan'
        }
        let delivered = eventEmitter.emit('delivered', obj.orderID);
        let time = new Date();
        time = time.toUTCString();
        expect(delivered).toBeTruthy();
    })
})

