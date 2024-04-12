const formatDateTime = (datetimeString: string) => {

    // Create a new Date object using the datetime string
    const datetime = new Date(datetimeString);

    // Extract date components
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1; // Note: Month starts from 0
    const date = datetime.getDate();

    // Extract time components
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    const seconds = datetime.getSeconds();

    // Format date and time
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;
    const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    return `${formattedDate} at ${formattedTime}`
    
}

export default formatDateTime;