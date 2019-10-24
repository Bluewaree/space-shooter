export const count_seconds = (old_time) => {

    let new_time = new Date().getTime();
    let distance = new_time - old_time;

    return Math.floor((distance % (1000 * 60)) / 1000);
}