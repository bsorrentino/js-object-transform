
//declare function transform<S,D>(src: S, dest: D, config: any): D;

declare interface transform<S,D> {
    (src: S, dest: D, config: any): D;
    (src: S, config: any): D;
}