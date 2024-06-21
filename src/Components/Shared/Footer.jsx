

const Footer = () => {
    return (
        <div className="mt-28">
            <footer className="footer grid-rows-2 p-10 bg-black text-neutral-content">
                <nav>
                    <img className="w-12 rounded-full" src="https://i.postimg.cc/8cp7fDtp/baking-bread-abstract-concept-illustration-quarantine-cooking-family-recipe-baking-yeast-335657-1062.jpg" alt="" />
                    <h6 className="font-bold text-2xl text-white">Dorm Dine</h6>
                    <p className="border-[1px] w-44 border-gray-400 border-dashed"></p>
                    <a className="link link-hover">Wigglesworth Hall, Harvard University</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <a className="link link-hover">Twitter</a>
                    <a className="link link-hover">Instagram</a>
                    <a className="link link-hover">Facebook</a>
                    <a className="link link-hover">Github</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Explore</h6>
                    <a className="link link-hover">Menu</a>
                    <a className="link link-hover">Blogs</a>
                    <a className="link link-hover">Health Magazine</a>
                    <a className="link link-hover">Pricing</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Top Quality Food</a>
                    <a className="link link-hover">Variation</a>
                    <a className="link link-hover">Special Badge</a>
                    <a className="link link-hover">Offers</a>
                </nav>
                <form>
                    <h6 className="footer-title">Newsletter</h6>
                    <fieldset className="form-control w-80">
                        <label className="label">
                            <span className="label-text text-gray-500">Enter your email address</span>
                        </label>
                        <div className="join">
                            <input type="text" placeholder="username@site.com" className="input input-bordered join-item" />
                            <button className="btn btn-primary join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </footer>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright © 2024 - All right reserved</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;