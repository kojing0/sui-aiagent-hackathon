module contracts::reward_nft;

use std::string::String;

use sui::package;
use sui::display;
use sui::event;

public struct Reward has key, store {
    id: UID,
    name: String,
    image_url: String,
}

public struct REWARD_NFT has drop {}

public struct RewardMinted has copy, drop {
    recipient: address,
    name: String,
    image_url: String,
}

fun init(otw: REWARD_NFT, ctx: &mut TxContext) {
    let keys = vector[
        b"name".to_string(),
        b"image_url".to_string(),
        b"description".to_string(),
        b"project_url".to_string(),
        b"creator".to_string(),
    ];

    let values = vector[
        b"{name}".to_string(),
        b"https://purple-gentle-elephant-417.mypinata.cloud/ipfs/{image_url}".to_string(),
        b"The Yambaru Kuina is a flightless bird native to Okinawa".to_string(),
        b"https://note.com/sugarman_dev/n/nc46b3f2eef6e".to_string(),
        b"Creator Sugarman".to_string(),
    ];

    let publisher = package::claim(otw, ctx);

    let mut display = display::new_with_fields<Reward>(
        &publisher, keys, values, ctx
    );

    display.update_version();

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}

public fun mint(name: String, image_url: String, ctx: &mut TxContext): Reward {
    let reward = Reward {
        id: object::new(ctx),
        name,
        image_url
    };

    reward
}

entry public fun mint_and_transfer(name: String, image_url: String, ctx: &mut TxContext) {
    let reward = mint(name, image_url, ctx);
    transfer::public_transfer(reward, ctx.sender());

    event::emit(RewardMinted {
        recipient: ctx.sender(),
        name,
        image_url,
    });
}