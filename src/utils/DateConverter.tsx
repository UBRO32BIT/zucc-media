export default function DateConverter(date: Date) {
    if (!date) return '';
    // Extract date components
    const day: string = ("0" + date.getDate()).slice(-2);
    const month: string = ("0" + (date.getMonth() + 1)).slice(-2); // Month is zero-based, so add 1
    const year: number = date.getFullYear();
    const hours: string = ("0" + date.getHours()).slice(-2);
    const minutes: string = ("0" + date.getMinutes()).slice(-2);
    const seconds: string = ("0" + date.getSeconds()).slice(-2);

    // Construct the formatted date string
    const formattedDate: string = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    // Output the formatted date
    return formattedDate;
}