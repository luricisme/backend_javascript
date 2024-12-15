const sendLogin = async () => {
    const user = document.getElementById("user").value;
    const pwd = document.getElementById("pwd").value;

    try{
        const response = await fetch('http://localhost:3500/auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', // Dùng để xem yêu cầu có bao gồm thông tin xác thực hay không. include: Là luôn bao gồm thông tin xác thực trong yêu cầu.
            body: JSON.stringify({user, pwd})
        });
        if(!response.ok){
            if(response.status === 400){
                return await sendRefreshToken();
            }
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch(err) {
        console.log(err.stack);
        dissplayErr();
    }
}