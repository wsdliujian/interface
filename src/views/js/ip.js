
export function getUserIP() {
    let p = new Promise(function(resolve, reject){
        let RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection
        if (RTCPeerConnection) {
            (
                function() {
                    let rtc = new RTCPeerConnection({ iceServers: [] })
                    if (1 || window.mozRTCPeerConnection) {
                        rtc.createDataChannel('', { reliable: false })
                    }

                    rtc.onicecandidate = function(evt) {
                        if (evt.candidate) grepSDP('a=' + evt.candidate.candidate)
                    }
                    rtc.createOffer(function(offerDesc) {
                        grepSDP(offerDesc.sdp)
                        rtc.setLocalDescription(offerDesc)
                    }, function(e) { console.warn('offer failed', e) })
                    let addrs = Object.create(null)
                    addrs['0.0.0.0'] = false
                    function updateDisplay(newAddr) {
                        if (newAddr in addrs) return
                        else addrs[newAddr] = true
                        let displayAddrs = Object.keys(addrs).filter(function(k) { return addrs[k] })
                        for (let i = 0; i < displayAddrs.length; i++) {
                            if (displayAddrs[i].length > 16) {
                                displayAddrs.splice(i, 1)
                                i--
                            }
                        }
                        console.log(displayAddrs)
                        //若网关为0则返回，不存在则返回第一个
                        for (let i = 0; i < displayAddrs.length; i++) {
                            let ip = displayAddrs[i];
                            if (ip.split(".").length > 3 && ip.split(".")[0] == 192 && ip.split(".")[2] == 0) {
                                resolve(ip);
                                break;
                            }
                        }
                    }
                    function grepSDP(sdp) {
                        sdp.split('\r\n').forEach(function(line) {
                            if (~line.indexOf('a=candidate')) {
                                const parts = line.split(' ')
                                const addr = parts[4]
                                const type = parts[7]
                                if (type === 'host') updateDisplay(addr)
                            } else if (~line.indexOf('c=')) {
                                const parts = line.split(' ')
                                const addr = parts[2]
                                updateDisplay(addr)
                            }
                        })
                    }
                })()
        } else {
            console.log('请使用主流浏览器：chrome,firefox,opera,safari')
            reject('请使用主流浏览器：chrome,firefox,opera,safari')
        }
    })
    return p;
}
export default {
    getUserIP
}