export interface Log {
    id?: number
    data: string
    ip: string
    request: string
    status: string
    useragent: string
}

// id
// 2020-01-01 00:00:11.763
// 192.168.234.82
// GET / HTTP/1.1
// 200
// swcd (unknown version) CFNetwork/808.2.16 Darwin/15.6.0
// Data, IP, Request, Status, User Agent (delimitado por aspas duplas);
