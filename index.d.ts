
declare interface transform<S,D> {
    (src: S, dest: D, config: any): D;
    (src: S, config: any): D;
}

declare module "js-object-transform" {
    export default function transform<S,D>(src: S, dest: D, config: any): D;
    export default function transform<S,D>(src: S,  config: any): D;
}
