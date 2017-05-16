
type Transform = {
        <S>(src: S, config: any): any;
        <S,D>(src: S, dest: D, config: any): D;
    };

declare module "js-object-transform" {
    var transform:Transform

    export = transform;
}
